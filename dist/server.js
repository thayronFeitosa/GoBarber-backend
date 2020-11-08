"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.post('/', function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email;
    var user = {
        name: name,
        email: email,
    };
    res.json(user);
});
app.listen(3333, function () {
    console.log("servidor rodando na porta 3333");
});
