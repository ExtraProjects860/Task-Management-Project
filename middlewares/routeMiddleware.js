
const getRoutes = (app) => {
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
  
  return routes;
};
  

const routeMiddleware = (req, res, next) => {
  try {
    const routes = getRoutes(req.app);
    
    const allowedMethods = routes.find(r => r.path === req.path)?.methods;
      
    if (allowedMethods && !allowedMethods[req.method.toLowerCase()]) {
      return res.status(405).json({ error: "Not allowed method" });
    }
    
    if (!allowedMethods) {
      return res.status(404).json({ error: "Route not found" });
    }
    
    next();
  } catch (error) {
    console.error("Error processing request:", error);
    
    return res.status(500).json({ error: "Internal server error" });
  }
};
  

module.exports = routeMiddleware;
  