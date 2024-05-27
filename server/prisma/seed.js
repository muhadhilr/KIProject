const db = require("../src/db/prisma.db");

async function main() {
  const menus = await db.prisma.menu.createMany({
    data: [
      {
        nama: "Ayam Kalasan",
        harga: 15000,
        isAvailable: true,
      },
      {
        nama: "Ayam Lodho",
        harga: 18000,
        isAvailable: true,
      },
      {
        nama: "Ayam Kari",
        harga: 12000,
        isAvailable: true,
      },
      {
        nama: "Ayam Kecap",
        harga: 12000,
        isAvailable: true,
      },
      {
        nama: "Ayam Bakar",
        harga: 15000,
        isAvailable: true,
      },
    ],
  });
  console.log({ menus });
  const profiles = await db.prisma.profile.createMany({
    data: [
      {
        role: "KASIR",
        username: "Joko_Anwar",
        password: "wkwkwkwk",
      },
      {
        role: "KASIR",
        username: "Anna",
        password: "wkwkwkwk",
      },
    ],
  });
  console.log({ profiles });
  const customer1 = await db.prisma.customer.create({
    data: {
      customerName: "Zawawi",
      email: "zawawi@gmail.com",
    },
  });
  const transaction2 = await db.prisma.transaction.create({
    data: {
      paidoff: true,
      totalPrice: null,
      customerEmail: "zawawi@gmail.com",
      menus: {
        create: [
          {
            menu: {
              connect: {
                id: 1,
              },
            },
          },
          {
            menu: {
              connect: {
                id: 2,
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
