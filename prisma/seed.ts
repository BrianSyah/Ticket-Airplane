const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashPassword = bcrypt.hashSync("serveradmin123", 10);
  const userSeed = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      name: "Admin",
      role: "ADMIN",
      password: hashPassword,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
