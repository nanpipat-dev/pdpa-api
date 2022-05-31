"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller/controller");
function default_1(app) {
    app.get("/healthcheck", (req, res) => res.status(200).send("ok"));
    app.get("/api/cookies", controller_1.getCookie);
}
exports.default = default_1;
