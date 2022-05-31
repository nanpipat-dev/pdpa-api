"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieService = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function getCookieService(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            // let encoded = encodeURI(url);
            const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);
            console.log(url, withHttp(), "url");
            yield page.goto(withHttp());
            const element = yield page.waitForTimeout(15000);
            const cookies = yield page.cookies();
            console.log(cookies, "cookies");
            const responseCookie = [];
            if (cookies) {
                for (var i = 0; i < (cookies === null || cookies === void 0 ? void 0 : cookies.length); i++) {
                    const cookietype = {
                        domain: cookies[i].domain,
                        value: cookies[i].value,
                        name: cookies[i].name,
                    };
                    yield responseCookie.push(cookietype);
                }
            }
            return responseCookie;
        }
        catch (error) {
            console.log(error, "errrr");
            throw new Error("Invalid url");
        }
    });
}
exports.getCookieService = getCookieService;
