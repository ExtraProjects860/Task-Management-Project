
const jsonErrorMiddleware = (err, req, res, next) => {
  try {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON');

      return res.status(400).send({ status: 400, message: 'Bad JSON' });
    }
    next();
  } catch (error) {
    console.error("Error processing JSON syntax error:", error);
    
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = jsonErrorMiddleware;