// Mengimpor library zod untuk validasi skema
import { z } from "zod";

// Daftar tipe gambar yang diterima
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// Ukuran maksimum file yang diperbolehkan (2MB)
const MAX_FILE_SIZE = 2000000; // 2MB

// Skema validasi untuk form pesawat menggunakan zod
export const airplaneFormSchema = z.object({
  // Validasi untuk field nama pesawat
  name: z
    .string({ required_error: "Nama Pesawat tidak boleh kosong" }) // tidak boleh kosong
    .min(4, { message: "Nama Pesawat harus memiliki minimal 4 karakter" }), // Harus memiliki minimal 4 karakter

  // Validasi untuk field kode pesawat
  code: z
    .string({ required_error: "Kode Pesawat tidak boleh kosong" }) // tidak boleh kosong
    .regex(/^[A-Z]{3}-[0-9]{3}$/, "Format kode harus [XXX-123]"), // Harus sesuai dengan format [XXX-123]

  // Validasi untuk field gambar pesawat
  image: z
    .any() // Menerima tipe apapun
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type), // Memastikan tipe file termasuk dalam tipe yang diterima
      "Gambar harus berekstensi jpeg/jpg/png" // Pesan error jika tipe file tidak valid
    )
    .refine(
      (file: File) => file.size <= MAX_FILE_SIZE, // Memastikan ukuran file tidak melebihi ukuran maksimum
      "Ukuran file tidak boleh melebihi 2MB" // Pesan error jika ukuran file terlalu besar
    ),
});
