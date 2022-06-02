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
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
function getCookieService(url) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const browser = await puppeteer.launch({
            //   args: [
            //     '--no-sandbox',
            //     '--disable-setuid-sandbox',
            //   ],
            // });
            console.log("newver");
            const browser = yield puppeteer_core_1.default.launch({
                args: [...chrome_aws_lambda_1.default.args, '--no-sandbox', "--disabled-setupid-sandbox"],
                defaultViewport: chrome_aws_lambda_1.default.defaultViewport,
                executablePath: yield chrome_aws_lambda_1.default.executablePath,
                headless: true,
                ignoreHTTPSErrors: true,
            });
            const page = yield browser.newPage();
            // let encoded = encodeURI(url);
            const withHttp = () => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);
            console.log(url, withHttp(), "url");
            yield page.goto(withHttp());
            const element = yield page.waitForTimeout(5000);
            const findLinks = yield page.evaluate(() => Array.from(document.querySelectorAll("a")).map((info) => ({
                url: info.href
            })));
            // const fl: string[] = []
            // await page.evaluate(() => {
            //   if(document.querySelectorAll("a")) {
            //     for(let d =0; (d < document.querySelectorAll("a").length && d < 10); d++){
            //       console.log(document.querySelectorAll("a")[d])
            //     }
            //   }
            // })
            console.log(findLinks === null || findLinks === void 0 ? void 0 : findLinks.length, "findLinks?.length");
            for (let j = 0; j < 5 && j < (findLinks === null || findLinks === void 0 ? void 0 : findLinks.length); j++) {
                if ((_a = findLinks[j]) === null || _a === void 0 ? void 0 : _a.url) {
                    console.log((_b = findLinks[j]) === null || _b === void 0 ? void 0 : _b.url, "findLinks");
                    yield page.goto((_c = findLinks[j]) === null || _c === void 0 ? void 0 : _c.url);
                    yield page.waitForTimeout(1000);
                }
            }
            // const element = await page.waitForTimeout(20000)
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
        return [];
    });
}
exports.getCookieService = getCookieService;
