const corsOptions = {
  origin: [
    "https://ki-project.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "PUT", "POST"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "x-api-key",
  ],
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
