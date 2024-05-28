const db = require("../src/db/prisma.db");

async function main() {
  const menus = await db.prisma.menu.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Ayam Kalasan",
      price: 15000,
      isAvailable: true,
    },
  });
  const menus2 = await db.prisma.menu.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Ayam Betutu",
      price: 15000,
      isAvailable: true,
    },
  });
  console.log({ menus });
  const profiles = await db.prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      role: "KASIR",
      username: "Anna",
      password: "wkwkwkwk",
    },
  });
  console.log({ profiles });
  const customer1 = await db.prisma.customer.create({
    data: {
      customerName: "Zawawi",
      noTable: "A2",
    },
  });
  const transaction1 = await db.prisma.transaction.upsert({
    where: { id: 1 },
    update: {},
    create: {
      paidoff: true,
      totalPrice: null,
      idCustomer: 1,
      items: {
        create: [
          {
            item: {
              create: {
                menuId: 1,
                amount: 10,
              },
            },
          },
          {
            item: {
              create: {
                menuId: 2,
                amount: 10,
              },
            },
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await db.prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.prisma.$disconnect();
    process.exit(1);
  });
