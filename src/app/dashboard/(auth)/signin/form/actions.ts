"use server"; // Menandakan bahwa file ini berisi kode server-side

import { redirect } from "next/navigation"; // Mengimpor fungsi redirect dari next/navigation
import { formSchema } from "./validation"; // Mengimpor skema validasi form dari file validation
import bcrypt from "bcrypt"; // Mengimpor bcrypt untuk hashing password
import { lucia } from "@/lib/auth"; // Mengimpor lucia untuk manajemen sesi dan autentikasi
import { cookies } from "next/headers"; // Mengimpor cookies dari next/headers
import prisma from "../../../../../../lib/prisma"; // Mengimpor prisma untuk interaksi dengan database

// Mendefinisikan interface untuk hasil aksi
export interface ActionResult {
  errorTitle: string | null; // Judul error jika ada
  errorDesc: string[] | null; // Deskripsi error jika ada
}

// Fungsi untuk menangani proses sign-in
export async function handleSignIn(
  prevState: any, // Status sebelumnya, tidak digunakan di sini
  formData: FormData // Data form yang dikirim oleh pengguna
): Promise<ActionResult> {
  // Memvalidasi data form menggunakan formSchema
  const values = formSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Jika validasi gagal, kembalikan error
  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation", // Judul error validasi
      errorDesc, // Deskripsi error validasi
    };
  }

  // Mencari pengguna berdasarkan email
  const existingUser = await prisma.user.findFirst({
    where: {
      email: values.data.email,
    },
  });

  // Jika pengguna tidak ditemukan, kembalikan error
  if (!existingUser) {
    return {
      errorTitle: "Error", // Judul error
      errorDesc: ["Email tidak temukan"], // Deskripsi error
    };
  }

  // Memeriksa apakah password yang diberikan valid
  const validPassword = await bcrypt.compare(
    values.data.password,
    existingUser.password
  );

  // Jika password tidak valid, kembalikan error
  if (!validPassword) {
    return {
      errorTitle: "Error", // Judul error
      errorDesc: ["Email atau Password salah"], // Deskripsi error
    };
  }

  // Membuat sesi untuk pengguna yang valid
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);

  // Mengatur cookie sesi
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // Mengarahkan pengguna ke dashboard
  return redirect("/dashboard");
}
