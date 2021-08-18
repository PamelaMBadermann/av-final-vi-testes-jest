"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _App_express;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../../features/annotations/presentation/routes/routes"));
class App {
    constructor() {
        _App_express.set(this, void 0);
        __classPrivateFieldSet(this, _App_express, express_1.default(), "f");
    }
    get server() {
        return __classPrivateFieldGet(this, _App_express, "f");
    }
    init() {
        this.config();
        this.middlewares();
        this.routes();
    }
    config() {
        __classPrivateFieldGet(this, _App_express, "f").use(express_1.default.urlencoded({ extended: false }));
        __classPrivateFieldGet(this, _App_express, "f").use(express_1.default.json());
        __classPrivateFieldGet(this, _App_express, "f").use(cors_1.default());
    }
    middlewares() {
    }
    routes() {
        const router = express_1.Router();
        __classPrivateFieldGet(this, _App_express, "f").get('/', (_, response) => response.redirect('/api'));
        __classPrivateFieldGet(this, _App_express, "f").use('/api', router);
        router.get('/', (_, response) => response.send('API rodando...'));
        new routes_1.default().init(router);
    }
    start(port) {
        __classPrivateFieldGet(this, _App_express, "f").listen(port, () => {
            console.log('API rodando...');
        });
    }
}
exports.default = App;
_App_express = new WeakMap();
