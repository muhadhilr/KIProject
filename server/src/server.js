const express = require("express");
const app = express();

const { transactionRouter } = require("./transactions/transaction.router");
const { menuRouter } = require("./menus/menu.router");
const profileRouter = require("./profile/profile.router");
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Methods", "PUT");

  if (req.method === "OPTIONS") return res.status(200).json({});

  next();
});

app.use(express.json());
app.use(transactionRouter);
app.use(menuRouter);
app.use(profileRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
