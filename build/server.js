"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const controller_1 = require("./controller/controller");
const host = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 5055;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/api/healthz", (req, res) => res.status(200).send("ok"));
app.get("/api/conkies", controller_1.getCookie);
app.post("/api/company", controller_1.saveCompany);
app.listen(port, host, function () {
    console.log(`Server started.......${port}`);
    // routes(app);
});
module.exports = app;
