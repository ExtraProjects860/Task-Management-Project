
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Rota para renderizar a view
router.get('/view', (req: Request, res: Response) => {
    res.render('index'); // Certifique-se de ter um arquivo `index.ejs` na pasta `views`
});

export default router;
