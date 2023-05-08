import { Request, Response } from 'express';
import db from '../database';

class PoligonoController {

    public index(req: Request, res: Response) {
        // res.send('tramosController');
        // db.query('DESCRIBE tramos');
        res.json({ text: 'poligonosController' });
    }

    public async list(req: Request, res: Response): Promise<void> {
        const tramos = await db.query('SELECT * FROM vectorial_4326');
        res.json(tramos);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;   
        const poligono = await db.query('SELECT * FROM vectorial_4326 WHERE fid ='+ id);        
        console.log(poligono.length);
        res.json(poligono);
        // if (poligono.length > 0) {
        //     return res.json(poligono[0]);
        // }
        // res.status(404).json({ text: "Esa línea de la tramos no exite" });
    }
  

}

const poligonoController = new PoligonoController();
export default poligonoController;
