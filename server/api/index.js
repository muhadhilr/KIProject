const express = require("express");
const cors = require("cors");
const app = express();
const { transactionRouter } = require("../src/transactions/transaction.router");
const { menuRouter } = require("../src/menus/menu.router");
const profileRouter = require("../src/profile/profile.router");

const corsOptions = {
  origin: "https://ki-project.vercel.app",
  methods: ["GET", "PUT"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("", transactionRouter); 
app.use("", menuRouter);
app.use("", profileRouter);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
