const db = require("../src/db/prisma.db");

async function main() {
  const menus = await db.prisma.menu.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Ayam Kalasan",
      price: 15000,
      isAvailable: true,
      picture: "https://i.pinimg.com/564x/be/c8/72/bec8721104681a2d2a0c8490cf54457b.jpg",
    },
  });
    
  const menus2 = await db.prisma.menu.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Ayam Betutu",
      price: 15000,
      isAvailable: true,
      picture:
        "https://i.pinimg.com/564x/7b/d4/7e/7bd47ea0ce92314b5e61681e6c62baa5.jpg",
    },
  });
  const menus3 = await db.prisma.menu.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Ayam Lodho",
      price: 21000,
      isAvailable: true,
      picture:
        "https://i.pinimg.com/564x/d2/4e/f1/d24ef15be8618bfe3fab786aecdb347a.jpg",
    },
  });
  const menus4 = await db.prisma.menu.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Ayam Kari",
      price: 14500,
      isAvailable: true,
      picture:
        "https://i.pinimg.com/564x/6f/5e/e3/6f5ee3a205855201febd9291677d9bd9.jpg",
    },
  });
  const menus5 = await db.prisma.menu.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "Opor Ayam",
      price: 13000,
      isAvailable: true,
      picture:
        "https://i.pinimg.com/564x/06/92/a9/0692a9a94d5f42989ce11b60c677aeb7.jpg",
    },
  });
  const menus6 = await db.prisma.menu.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "Ayam Geprek",
      price: 21000,
      isAvailable: true,
      picture:
        "https://i.pinimg.com/564x/de/35/70/de35701ccf387a146934d32e474ce13a.jpg",
    },
  });
  const menus7 = await db.prisma.menu.upsert({
    where: { id: 7 },
    update: {},
    create: {
      name: "Sate Ayam",
      price: 21000,
      isAvailable: true,
      picture:
        "https://i.pinimg.com/564x/f8/f9/50/f8f9509a79ee3ece31f0074ea9c2ab11.jpg",
    },
  });
  const menus8 = await db.prisma.menu.upsert({
    where: { id: 8 },
    update: {},
    create: {
      name: "Ayam Goreng",
      price: 21000,
      isAvailable: true,
      picture:
        "https://i.pinimg.com/564x/d5/a9/3c/d5a93c0f3fa18bf8cd356f6f2fa5564e.jpg",
    },
  });
  const menus9 = await db.prisma.menu.upsert({
    where: { id: 9 },
    update: {},
    create: {
      name: "Ayam Bumbu Rujak",
      price: 21000,
      isAvailable: true,
      picture:
        "https://i.pinimg.com/564x/84/36/ad/8436ad91351f6641aea90445c68dc30b.jpg",
    },
  });
  const profiles = await db.prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      role: "admin",
      email: "Anna",
      password: "wkwkwkwk",
    },
  });
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
