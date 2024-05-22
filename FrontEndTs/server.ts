
import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();
const port = 3000;

// Configurar a pasta de views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para analisar o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar as rotas definidas no arquivo routes.ts
app.use('/', routes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
