const express = require("express");
const cors = require("cors");
const app = express();
const { transactionRouter } = require("../src/transactions/transaction.router");
const { menuRouter } = require("../src/menus/menu.router");
const profileRouter = require("../src/profile/profile.router");

const corsOptions = require("../config/corsOptions");
const apiKeyMiddleware = require("../middleware/apiKeyMiddleware");

app.use(cors(corsOptions));
app.use(apiKeyMiddleware);

app.use(express.json());
app.use("", transactionRouter);
app.use("", menuRouter);
app.use("", profileRouter);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
