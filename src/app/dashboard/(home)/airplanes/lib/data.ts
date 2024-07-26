// Import statement untuk menggunakan Prisma Client
import prisma from "../../../../../../lib/prisma";

// Fungsi asinkron untuk mengambil data pesawat dari database menggunakan Prisma
export async function getAirplanes() {
  try {
    // Menggunakan metode findMany dari Prisma Client untuk mendapatkan semua data pesawat
    const planes = await prisma.airplane.findMany();
    return planes; // Mengembalikan data pesawat yang berhasil diambil
  } catch (error) {
    // Menangkap dan menangani error yang mungkin terjadi selama pengambilan data dari database
    console.log("Database Error", error); // Mencetak pesan error ke konsol
    return []; // Mengembalikan array kosong jika terjadi error
  }
}
