const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const userRoutes = require("./routes/userRoutes.js");
const taskListRoutes = require("./routes/taskListRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");

const routeMiddleware = require("./middlewares/routeMiddleware");
const jsonErrorMiddleware = require("./middlewares/jsonErrorMiddleware");
const isAuthenticated = require("./middlewares/authMiddleware");

app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))
 
app.use("/user", userRoutes);
app.use("/tasks-lists", isAuthenticated, taskListRoutes);
app.use("/tasks", isAuthenticated, taskRoutes);

app.use(routeMiddleware);
app.use(jsonErrorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});