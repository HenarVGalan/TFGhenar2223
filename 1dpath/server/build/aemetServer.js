"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const aemetRoutes_1 = __importDefault(require("./routes/aemetRoutes"));
const axios = require('axios');
class AemetServer {
    constructor() {
        this.api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5hci52ZWxhc2NvMUBhbHUudWNsbS5lcyIsImp0aSI6ImNhZDJmZDk2LTA4MDctNGMyMy05ZmIzLTJkMjFkNGUxNjBkNCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjg1MDk1MTk2LCJ1c2VySWQiOiJjYWQyZmQ5Ni0wODA3LTRjMjMtOWZiMy0yZDIxZDRlMTYwZDQiLCJyb2xlIjoiIn0.eOvtg2o-bfmL_JesnFGbE_bgZsWT5naIKMhTPg77o5E';
        this.options = {
            "method": "GET",
            "hostname": "opendata.aemet.es",
            "path": "/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones/?api_key=jyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqbW9udGVyb2dAYWVtZXQuZXMiLCJqdGkiOiI3NDRiYmVhMy02NDEyLTQxYWMtYmYzOC01MjhlZWJlM2FhMWEiLCJleHAiOjE0NzUwNTg3ODcsImlzcyI6IkFFTUVUIiwiaWF0IjoxNDc0NjI2Nzg3LCJ1c2VySWQiOiI3NDRiYmVhMy02NDEyLTQxYWMtYmYzOC01MjhlZWJlM2FhMWEiLCJyb2xlIjoiIn0.xh3LstTlsP9h5cxz3TLmYF4uJwhOKzA0B6-vH8lPGGw",
            "headers": {
                "cache-control": "no-cache"
            }
        };
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
        this.app.use('/', aemetRoutes_1.default);
        // this.app.use('/api/tramos', tramosRoutes);
        // this.app.use('/api/poligonos', poligonoRoutes);
        // this.app.use('/api/punto', puntoRoutes);
        // this.app.use('/api/aemet', aemetRoutes);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server aemet on port', this.app.get('port'));
        });
    }
}
const aemetserver = new AemetServer();
aemetserver.start();
