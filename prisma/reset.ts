// prisma/reset.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "Session",
      "Ticket",
      "FlightSeat",
      "Flight",
      "Airplane",
      "User"
    RESTART IDENTITY CASCADE;
  `);

  console.log("✅ Semua data berhasil dihapus dari database Neon PostgreSQL!");
}

main()
  .catch((e) => {
    console.error("❌ Gagal reset data:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
