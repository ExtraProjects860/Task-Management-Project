const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./config/database');

const UserRoutes = require('./routes/userRoutes');
const TaskManagementRoutes = require('./routes/taskManagementRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', UserRoutes);
app.use('/api', TaskManagementRoutes);

// realiza a conexão com o banco antes de subir o servidor e também sincroniza
database.connect().then(() => {
    database.getSequelize().sync().then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port http://localhost:${PORT}`)
        });
    })
})