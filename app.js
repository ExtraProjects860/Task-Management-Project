const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const firebase = require("./config/Firebase")

// importar posteriormente os arquivos de rotas aqui

//

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// colocar posteriormente os arquivos de rotas aqui

//

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
});