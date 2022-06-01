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
exports.getCookie = void 0;
const logger_1 = __importDefault(require("../logger"));
const service_1 = require("../service/service");
function getCookie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.query.url, "req.query.url");
            const user = yield (0, service_1.getCookieService)(req.query.url);
            return res.status(200).send({ data: user });
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(400).send(e.message);
        }
    });
}
exports.getCookie = getCookie;
