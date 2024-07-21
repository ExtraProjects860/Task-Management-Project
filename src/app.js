const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

const userRoutes = require("./routes/userRoutes.js");

app.use(bodyParser.json());
app.use(cors());

app.use("/", userRoutes);

app.use((req, res, next) => {
  try {
    const routes = [];

    app._router.stack.forEach(middleware => {
        if (middleware.route) {
            // Rota registrada no app
            routes.push(middleware.route);
        } else if (middleware.name === "router") {
            // Rotas dentro do roteador
            middleware.handle.stack.forEach(handler => {
                let route;
                route = handler.route;
                route && routes.push(route);
            });
        }
    });
  
    const allowedMethods = routes.find(r => r.path === req.path)?.methods;
    
    if (allowedMethods && !allowedMethods[req.method.toLowerCase()]) {
        return res.status(405).json({ error: "Not allowed method" });
    }
  
    if (!allowedMethods) {
        return res.status(404).json({ error: "Not find route" });
    }
  
    next();
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.use((err, req, res, next) => {
  try{
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON');
      return res.status(400).send({ status: 400, message: 'Bad JSON' });
    }
    next();
  } catch(error) {
    console.error("Error processing JSON syntax error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
