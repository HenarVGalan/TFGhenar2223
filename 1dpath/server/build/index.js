"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const tramosRoutes_1 = __importDefault(require("./routes/tramosRoutes"));
const poligonoRoutes_1 = __importDefault(require("./routes/poligonoRoutes"));
const puntoRoutes_1 = __importDefault(require("./routes/puntoRoutes"));
const aemetRoutes_1 = __importDefault(require("./routes/aemetRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev')); //Para ver las peticiones al servidor
        this.app.use((0, cors_1.default)()); //para que angular pueda pedir datos a nuestro servidor
        this.app.use(express_1.default.json()); //para poder aceptar ficheros en formatos json
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/tramos', tramosRoutes_1.default);
        this.app.use('/api/poligonos', poligonoRoutes_1.default);
        this.app.use('/api/punto', puntoRoutes_1.default);
        this.app.use('/api/aemet', aemetRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
