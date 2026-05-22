"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const request_routes_1 = require("./routes/request.routes");
const admin_routes_1 = require("./routes/admin.routes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
exports.app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
    });
});
exports.app.use('/api/requests', request_routes_1.requestRouter);
exports.app.use('/api/admin', admin_routes_1.adminRouter);
