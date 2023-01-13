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
exports.saveCompany = exports.getCookie = void 0;
const mongodb_1 = require("mongodb");
const logger_1 = __importDefault(require("../logger"));
const service_1 = require("../service/service");
const uri = process.env.MONGOURL || "mongodb+srv://admin:1234@conkies.i0g3ymq.mongodb.net/?retryWrites=true&w=majority";
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
function saveCompany(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const company = req === null || req === void 0 ? void 0 : req.body;
            const client = new mongodb_1.MongoClient(uri, { serverApi: mongodb_1.ServerApiVersion.v1 });
            yield client.connect();
            let getforCheck = yield client.db('conkies_db').collection('companies').findOne({ companyName: company.companyName });
            if (getforCheck) {
                yield client.db('conkies_db').collection('companies').updateOne({ _id: getforCheck._id }, { $set: company });
            }
            else {
                yield client.db('conkies_db').collection('companies').insertOne(company);
            }
            yield client.close();
            res.status(200).send({
                "status": "OK",
                "company": company
            });
        }
        catch (error) {
            console.log(error, "errorerrorerrorerrorerror");
        }
    });
}
exports.saveCompany = saveCompany;
