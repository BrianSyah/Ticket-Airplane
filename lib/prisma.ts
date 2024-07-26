// Mengimpor PrismaClient dari paket @prisma/client.
import { PrismaClient } from "@prisma/client";

// Mendeklarasikan variabel prisma dengan tipe PrismaClient.
let prisma: PrismaClient;

// Deklarasi untuk memastikan globalThis memiliki properti prisma yang bertipe PrismaClient.
declare const globalThis: {
  prisma: PrismaClient;
};

// Jika aplikasi berjalan dalam mode production
if (process.env.NODE_ENV === "production") {
  // Membuat instance baru PrismaClient.
  prisma = new PrismaClient();
} else {
  // Jika aplikasi tidak dalam mode production, cek apakah globalThis.prisma sudah ada.
  if (!globalThis.prisma) {
    // Jika globalThis.prisma belum ada, buat instance baru PrismaClient dan simpan di globalThis.prisma.
    globalThis.prisma = new PrismaClient();
  }

  // Set variabel prisma dengan globalThis.prisma (instance PrismaClient yang sudah ada atau yang baru dibuat).
  prisma = globalThis.prisma;
}

// Mengekspor instance prisma sehingga bisa digunakan di bagian lain aplikasi.
export default prisma;
