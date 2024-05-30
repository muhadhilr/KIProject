const db = require("../db/prisma.db");

const findAll = async () => {
  try {
    return await db.prisma.menu.findMany({
      select: {
        id: true,
        name: true,
        isAvailable: true,
        price: true,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const findById = async (id) => {
  try {
    const menu = await db.prisma.menu.findUnique({
      where: { id: id },
    });
    return menu;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateByid = async (id, isAvailable) => {
  try {
    const menu = await db.prisma.menu.update({
      where: { id: id },
      data: {
        isAvailable: isAvailable,
      },
    });
    return menu;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  updateByid,
};
