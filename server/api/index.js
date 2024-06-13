const express = require("express");
const cors = require("cors");
const app = express();
const { transactionRouter } = require("../src/transactions/transaction.router");
const { menuRouter } = require("../src/menus/menu.router");
const profileRouter = require("../src/profile/profile.router");

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  if ((origin && origin === allowedOrigin) || (referer && referer.startsWith(allowedOrigin))) {
      next();
  } else {
      res.status(403).send('Access Denied');
  }
});

const corsOptions = {
  origin: (origin, callback) => {
      if (origin === "https://ki-project.vercel.app/" || !origin) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  }
};


app.use(cors(corsOptions));

app.use("/", transactionRouter);
app.use("/", menuRouter);
app.use("/", profileRouter);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
