"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller/controller");
const host = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/healthcheck", (req, res) => res.status(200).send("ok"));
app.get("/api/cookies", controller_1.getCookie);
app.listen(port, host, function () {
    console.log(`Server started.......${port}`);
    // routes(app);
});
module.exports = app;
