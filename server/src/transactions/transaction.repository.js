const db = require("../db/prisma.db");

const findAll = async () => {
  try {
    const transactions = await db.prisma.transaction.findMany({
      include: {
        customer: {
          select: {
            customerName: true,
          },
        },
        items: {
          include: {
            item: {
              include: {
                menu: true,
              },
            },
          },
        },
      },
    });

    transactions.forEach((transaction) => {
      transaction.totalPrice = transaction.items.reduce(
        (total, currentItem) => {
          return total + currentItem.item.menu.price * currentItem.item.amount;
        },
        0
      );
    });

    return transactions;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const findById = async (id) => {
  try {
    return await db.prisma.transaction.findFirst({
      where: { id: id },
      select: {
        id: true,
        paidoff: true,
        totalPrice: true,
        idCustomer: true,
        items: {
          select: {
            item: true,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateByid = async (id, paidoff) => {
  try {
    const transaction = await db.prisma.transaction.update({
      where: { id: id },
      data: {
        paidoff: paidoff,
      },
    });
    return transaction;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createTransaction = async (username, noTable, items) => {
  try {
    // Find customer by noTable
    let customer = await db.prisma.customer.findFirst({
      where: { noTable },
    });

    // If customer does not exist, create a new one
    if (!customer) {
      customer = await db.prisma.customer.create({
        data: {
          noTable,
          customerName: username,
        },
      });
    }

    // Create the transaction with the items
    const transaction = await db.prisma.transaction.create({
      data: {
        paidoff: false,
        idCustomer: customer.id,
        items: {
          create: items.map((item) => ({
            item: {
              create: {
                amount: item.amount,
                menuId: item.menuId,
              },
            },
          })),
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            item: {
              include: {
                menu: true,
              },
            },
          },
        },
      },
    });

    // Calculate the total price
    const totalPrice = transaction.items.reduce((total, currentItem) => {
      return total + currentItem.item.menu.price * currentItem.item.amount;
    }, 0);

    // Update the transaction with the total price
    const updatedTransaction = await db.prisma.transaction.update({
      where: { id: transaction.id },
      data: { totalPrice },
    });

    return updatedTransaction;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  updateByid,
  createTransaction,
};
