const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/menus", async (req, res) => {
  const menus = await prisma.menu.findMany();
  res.send(menus);
});

app.get("/transactions/:customerId", async (req, res) => {
  const customerId = parseInt(req.params.customerId);

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        idCustomer: customerId,
      },
      include: {
        customer: true,
        items: {
          include: {
            item: {
              select: {
                menu: {
                  select: {
                    name: true,
                    price: true,
                  },
                },
                amount: true,
              },
            },
          },
        },
      },
    });

    // Calculate total price for each transaction
    transactions.forEach((transaction) => {
      transaction.totalPrice = transaction.items.reduce(
        (total, currentItem) => {
          return total + currentItem.item.menu.price * currentItem.item.amount;
        },
        0
      );
    });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
