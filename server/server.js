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

// Define route to get all transactions for a customer by customer ID
// Define route to get all transactions for a customer by customer ID
// Define route to get all transactions for a customer by customer ID
app.get("/transactions/:customerId", async (req, res) => {
  try {
    const customerId = parseInt(req.params.customerId);

    // Retrieve customer data to get the email
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Retrieve transactions for the specified customer email
    const transactions = await prisma.transaction.findMany({
      where: { customerEmail: customer.email },
      include: {
        menus: {
          select: {
            menu: { select: { nama: true, harga: true } },
          },
        },
      },
    });

    // Calculate total price for each transaction
    transactions.forEach((transaction) => {
      transaction.totalPrice = transaction.menus.reduce(
        (total, menu) => total + menu.menu.harga,
        0
      );
    });

    // Return success response with transactions and associated menu details
    res.status(200).json({ transactions });
  } catch (error) {
    // Return error response
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
