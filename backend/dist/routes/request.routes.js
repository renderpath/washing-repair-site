"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRouter = void 0;
const express_1 = require("express");
const request_controller_1 = require("../controllers/request.controller");
exports.requestRouter = (0, express_1.Router)();
exports.requestRouter.post('/', request_controller_1.createRequest);
