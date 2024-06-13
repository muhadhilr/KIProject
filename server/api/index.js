const express = require("express");
const app = express();
const { transactionRouter } = require("../src/transactions/transaction.router");
const { menuRouter } = require("../src/menus/menu.router");
const profileRouter = require("../src/profile/profile.router");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT");

  if (req.method === "OPTIONS") return res.status(200).json({});

  next();
});

app.use(express.json());
app.use("", transactionRouter);  // Assuming your routers have base paths
app.use("", menuRouter);
app.use("", profileRouter);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;  // Exporting app as module
