import { Router } from 'express';
import aemetController from '../controllers/aemetController';

class AemetRoutes {

    public router: Router = Router();

    constructor() {

        this.config();

    }
    
    //this.app.use('/api/aemet', aemetRoutes);

    config(): void {

        this.router.get('/', aemetController.index);
        this.router.get('/datos/:idema', aemetController.getData);

    }
}

const aemetRoutes = new AemetRoutes();
export default aemetRoutes.router;