"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const host = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
var server = app.listen(port, host, function () {
    console.log(`Server started.......${port}`);
    (0, routes_1.default)(app);
});
server.timeout = 60000;
