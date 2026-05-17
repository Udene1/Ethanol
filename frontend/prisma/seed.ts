const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Categories
  const catHot = await prisma.category.upsert({
    where: { name: "Hot Flavors" },
    update: {},
    create: { name: "Hot Flavors", description: "Hot flavors including Gin, Whisky, etc." },
  });

  const catFruit = await prisma.category.upsert({
    where: { name: "Fruit Flavors" },
    update: {},
    create: { name: "Fruit Flavors", description: "Fruit flavors like Orange, Pineapple, etc." },
  });

  const catBoosters = await prisma.category.upsert({
    where: { name: "Ethanol Boosters" },
    update: {},
    create: { name: "Ethanol Boosters", description: "Boosters, Allyric, Enhancer." },
  });

  const catChemicals = await prisma.category.upsert({
    where: { name: "Powdered Chemicals" },
    update: {},
    create: { name: "Powdered Chemicals", description: "Aspartame, Saccharine, Citric acid, etc." },
  });

  // Products
  const products = [
    { name: "Gin Flavor", description: "Hot Gin flavor for industrial use.", categoryId: catHot.id, packaging: "5L, 20L" },
    { name: "Whisky Flavor", description: "Premium Whisky flavor profile.", categoryId: catHot.id, packaging: "5L, 20L" },
    { name: "Orange Flavor", description: "Zesty Orange flavor.", categoryId: catFruit.id, packaging: "5L, 20L" },
    { name: "Citric Acid", description: "Food-grade Citric Acid.", categoryId: catChemicals.id, packaging: "25KG Bag" },
    { name: "Aspartame (Red)", description: "Sweetener Aspartame red.", categoryId: catChemicals.id, packaging: "25KG Bag" },
    { name: "Boosters", description: "Ethanol booster for heat enhancer.", categoryId: catBoosters.id, packaging: "5L, 20L" },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Database seeded successfully with Prisma.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
