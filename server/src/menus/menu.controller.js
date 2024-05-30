const menuRepository = require("./menu.repository");

const getAllMenu = async (req, res) => {
  try {
    const menus = await menuRepository.findAll();
    res.status(200).json({
      status: "success",
      data: menus,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Oops something went wrong!",
    });
  }
};

const getMenuById = async (req, res) => {
  const menuId = parseInt(req.params.id);
  try {
    const menu = await menuRepository.findById(menuId);
    res.status(200).json({
      status: "success",
      data: menu,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Oops something went wrong!",
    });
  }
};

const updateMenuAvailability = async (req, res) => {
  const menuId = parseInt(req.params.id);
  const { isAvailable } = req.body;
  try {
    const updatedMenu = await menuRepository.updateByid(menuId, isAvailable);
    res.send({
      data: updatedMenu,
      message: "edit menu success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Oops something went wrong!",
    });
  }
};

module.exports = {
  getAllMenu,
  getMenuById,
  updateMenuAvailability,
};
