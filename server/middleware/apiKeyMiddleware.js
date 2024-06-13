// middleware/apiKeyMiddleware.js
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  const API_KEY = process.env.API_KEY;
  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Invalid API key." });
  }
};

module.exports = apiKeyMiddleware;
