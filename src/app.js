const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

const userRoutes = require("./routes/userRoutes.js");

app.use(bodyParser.json());
app.use(cors());

app.use("/", userRoutes);

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON');
      return res.status(400).send({ status: 400, message: 'Bad JSON' }); // Você pode modificar essa mensagem conforme necessário
    }
    next();
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
