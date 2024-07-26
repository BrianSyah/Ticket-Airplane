// Mengimpor PrismaAdapter dari paket @lucia-auth/adapter-prisma
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

// Mengimpor instance prisma dari file prisma di dalam direktori lib
import prisma from "../../lib/prisma";

// Mengimpor kelas Lucia dari paket lucia
import { Lucia, Session, User } from "lucia";

// Mengimpor enum RoleUser dari @prisma/client yang merepresentasikan peran pengguna
import { RoleUser } from "@prisma/client";

import { cache } from "react";
import { cookies } from "next/headers";

// Membuat instance adapter dengan menggunakan PrismaAdapter
// Mengambil dua parameter model prisma: prisma.session dan prisma.user
const adapter = new PrismaAdapter(prisma.session, prisma.user);

// Membuat instance lucia dengan adapter yang sudah dibuat dan konfigurasi tertentu
export const lucia = new Lucia(adapter, {
  // Konfigurasi untuk cookie sesi
  sessionCookie: {
    // Cookie sesi tidak akan kadaluarsa
    expires: false,
    // Atribut cookie
    attributes: {
      // Cookie hanya akan dikirim melalui koneksi aman (HTTPS) jika di lingkungan produksi
      secure: process.env.NODE_ENV === "production",
    },
  },
  // Fungsi untuk mendapatkan atribut pengguna dari database
  getUserAttributes: (attributes) => {
    // Mengembalikan objek yang berisi atribut pengguna yang diperlukan
    return {
      name: attributes.name,
      role: attributes.role,
      email: attributes.email,
      passport: attributes.passport,
    };
  },
});

// Fungsi getUser yang menggunakan cache untuk penyimpanan sementara
export const getUser = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    // Mendapatkan nilai sessionId dari cookie yang disimpan di browser pengguna
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    // Jika tidak ada sessionId, mengembalikan null
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    // Mencoba memvalidasi sesi berdasarkan sessionId yang didapatkan
    const result = await lucia.validateSession(sessionId);

    try {
      // Jika sesi valid dan masih segar, memperbarui cookie sesi
      if (result.session && result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }

      // Jika sesi tidak valid, membuat cookie sesi kosong
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {
      // Next.js melemparkan error saat mencoba mengatur cookie saat rendering halaman
    }

    // Mengembalikan objek user yang didapatkan dari validasi sesi
    return result;
  }
);

// Menyatakan modul tambahan untuk paket lucia
declare module "lucia" {
  // Antarmuka untuk registrasi
  interface Register {
    // Menyatakan tipe lucia sebagai instance dari Lucia yang dibuat
    Lucia: typeof lucia;
    // Menyatakan atribut pengguna di database
    DatabaseUserAttributes: {
      name: string; // Nama pengguna
      email: string; // Email pengguna
      role: RoleUser; // Peran pengguna yang didefinisikan oleh enum RoleUser
      passport: string | null; // Paspor pengguna, bisa null jika tidak ada
    };
  }
}
