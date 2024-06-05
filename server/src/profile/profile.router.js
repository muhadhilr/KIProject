const express = require("express");
const profileController = require("./profile.controller");
const profileRouter = express.Router();

profileRouter.post("/api/signup", profileController.addUser);
profileRouter.post("/api/login", profileController.loginUser);

module.exports = profileRouter;
