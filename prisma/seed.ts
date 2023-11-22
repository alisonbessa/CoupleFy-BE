import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Clear database
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CostCenter" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Transaction" CASCADE;`;

  console.log('database cleared');

  // Create 4 dummy users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'user1@example.com' },
      update: {},
      create: {
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password1',
        costCenterId: null,
      },
    }),
    prisma.user.upsert({
      where: { email: 'user2@example.com' },
      update: {},
      create: {
        name: 'User 2',
        email: 'user2@example.com',
        password: 'password2',
        costCenterId: null,
      },
    }),
    prisma.user.upsert({
      where: { email: 'user3@example.com' },
      update: {},
      create: {
        name: 'User 3',
        email: 'user3@example.com',
        password: 'password3',
        costCenterId: null,
      },
    }),
    prisma.user.upsert({
      where: { email: 'user4@example.com' },
      update: {},
      create: {
        name: 'User 4',
        email: 'user4@example.com',
        password: 'password4',
        costCenterId: null,
      },
    }),
  ]);

  // Create 2 dummy cost centers
  const costCenters = await Promise.all([
    prisma.costCenter.create({
      data: {},
    }),
    prisma.costCenter.create({
      data: {},
    }),
  ]);

  // Associate 2 users with each cost center
  await Promise.all([
    prisma.user.update({
      where: {
        id: users[0].id,
      },
      data: {
        costCenterId: costCenters[0].id,
      },
    }),
    prisma.user.update({
      where: {
        id: users[1].id,
      },
      data: {
        costCenterId: costCenters[0].id,
      },
    }),
    prisma.user.update({
      where: {
        id: users[2].id,
      },
      data: {
        costCenterId: costCenters[1].id,
      },
    }),
    prisma.user.update({
      where: {
        id: users[3].id,
      },
      data: {
        costCenterId: costCenters[1].id,
      },
    }),
  ]);

  // Create dummy categories for each cost center
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Groceries',
        isPrivate: false,
        costCenterId: costCenters[0].id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Entertainment',
        isPrivate: false,
        costCenterId: costCenters[0].id,
      },
    }),
  ]);

  // Create dummy transactions for the users
  const transactions = await Promise.all([
    prisma.transaction.create({
      data: {
        title: 'Transaction 1',
        amount: 100.0,
        categoryId: categories[0].id,
        paymentMethod: 'Credit Card',
        authorId: users[0].id,
        costCenterId: costCenters[0].id,
        date: '2023-11',
      },
    }),
    prisma.transaction.create({
      data: {
        title: 'Transaction 2',
        amount: 50.0,
        categoryId: categories[1].id,
        paymentMethod: 'Debit Card',
        authorId: users[1].id,
        costCenterId: costCenters[0].id,
        date: '2023-11',
      },
    }),
    prisma.transaction.create({
      data: {
        title: 'Transaction 3',
        amount: 75.0,
        categoryId: categories[1].id,
        paymentMethod: 'Cash',
        authorId: users[2].id,
        costCenterId: costCenters[1].id,
        date: '2023-11',
      },
    }),
    prisma.transaction.create({
      data: {
        title: 'Transaction 4',
        amount: 120.0,
        categoryId: categories[0].id,
        paymentMethod: 'Credit Card',
        authorId: users[3].id,
        costCenterId: costCenters[1].id,
        date: '2023-11',
      },
    }),
  ]);

  console.log('Dummy data created successfully:', {
    users,
    costCenters,
    categories,
    transactions,
  });
}

// Call the function to create dummy data
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
