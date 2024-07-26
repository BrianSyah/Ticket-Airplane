"use server";

import type { ActionResult } from "next/dist/server/app-render/types";
import { userSchema } from "../../sign-up/lib/validation";

import prisma from "../../../../../lib/prisma";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function signInUser(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const signInSchema = userSchema.pick({ email: true, password: true });

  const validate = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
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
    validate.data.password,
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

  return redirect("/");
}
