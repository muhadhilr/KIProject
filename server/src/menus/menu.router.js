const express = require("express");
const menuController = require("./menu.controller");
const menuRouter = express.Router();

menuRouter.get("/api/menus", menuController.getAllMenu);
menuRouter.get("/api/menu/:id", menuController.getMenuById);

menuRouter.get("/api/menuos", function(req, res) {
  res.send("Hello World!");
});

menuRouter.put(
  "/api/menu/:id/availability",
  menuController.updateMenuAvailability
);

module.exports = {
  menuRouter,
};
