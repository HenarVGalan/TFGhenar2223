import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import tramosRoutes from './routes/tramosRoutes';
import poligonoRoutes from './routes/poligonoRoutes';
import puntoRoutes from './routes/puntoRoutes';

//API KEY Servicio AEMET OpenData
// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5hci52ZWxhc2NvMUBhbHUudWNsbS5lcyIsImp0aSI6ImNhZDJmZDk2LTA4MDctNGMyMy05ZmIzLTJkMjFkNGUxNjBkNCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjg1MDk1MTk2LCJ1c2VySWQiOiJjYWQyZmQ5Ni0wODA3LTRjMjMtOWZiMy0yZDIxZDRlMTYwZDQiLCJyb2xlIjoiIn0.eOvtg2o-bfmL_JesnFGbE_bgZsWT5naIKMhTPg77o5E
class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {

        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev')); //Para ver las peticiones al servidor
        this.app.use(cors()); //para que angular pueda pedir datos a nuestro servidor
        this.app.use(express.json()); //para poder aceptar ficheros en formatos json
        this.app.use(express.urlencoded({ extended: false }));

    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/tramos', tramosRoutes);
        this.app.use('/api/poligonos', poligonoRoutes);
        this.app.use('/api/punto', puntoRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
           
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();