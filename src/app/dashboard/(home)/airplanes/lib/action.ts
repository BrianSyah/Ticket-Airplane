"use server"; // Menandakan bahwa file ini berisi kode server

import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions"; // Mengimpor tipe ActionResult
import { airplaneFormSchema } from "./validation"; // Mengimpor skema validasi form pesawat
import { redirect } from "next/navigation"; // Mengimpor fungsi redirect dari next/navigation
import { deleteFile, uploadFile } from "@/lib/supabase"; // Mengimpor fungsi deleteFile dan uploadFile dari supabase
import prisma from "../../../../../../lib/prisma"; // Mengimpor prisma untuk interaksi dengan database
import { revalidatePath } from "next/cache"; // Mengimpor fungsi revalidatePath dari next/cache

// Fungsi untuk mendapatkan data pesawat berdasarkan ID
export async function getAirplanesById(id: string) {
  try {
    const data = await prisma.airplane.findFirst({
      where: {
        id: id, // Mencari pesawat dengan ID yang diberikan
      },
    });
    return data; // Mengembalikan data pesawat jika ditemukan
  } catch (error) {
    console.error("Error fetching airplane by ID:", error); // Menampilkan error jika terjadi
    return null; // Mengembalikan null jika terjadi error
  }
}

// Fungsi untuk menyimpan data pesawat baru
export async function saveAirplane(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  // Validasi form data dengan skema airplaneFormSchema
  const values = airplaneFormSchema.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
    code: formData.get("code"),
  });

  // Jika validasi gagal, kembalikan pesan error
  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);
    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  // Upload file gambar pesawat
  const uploadedFile = await uploadFile(values.data.image);
  if (uploadedFile instanceof Error) {
    return {
      errorTitle: "Failed to upload file",
      errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
    };
  }

  try {
    // Menyimpan data pesawat ke database
    await prisma.airplane.create({
      data: {
        name: values.data.name,
        code: values.data.code,
        image: uploadedFile as string,
      },
    });
  } catch (error) {
    console.error("Error inserting airplane data:", error); // Menampilkan error jika terjadi
    return {
      errorTitle: "Failed to insert data",
      errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
    };
  }

  revalidatePath("/dashboard/airplanes"); // Merevalidasi path untuk memperbarui cache
  redirect("/dashboard/airplanes"); // Redirect ke halaman dashboard pesawat
}

// Fungsi untuk memperbarui data pesawat yang ada
export async function updateAirplane(
  prevState: any,
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const image = formData.get("image") as File; // Mendapatkan file gambar dari form data

  // Menentukan skema validasi berdasarkan apakah gambar diunggah atau tidak
  let airplaneFormSchemaUpdate;
  if (image.size === 0) {
    airplaneFormSchemaUpdate = airplaneFormSchema.omit({ image: true });
  } else {
    airplaneFormSchemaUpdate = airplaneFormSchema;
  }

  // Validasi form data dengan skema yang diperbarui
  const values = airplaneFormSchemaUpdate.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
    code: formData.get("code"),
  });

  // Jika validasi gagal, kembalikan pesan error
  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);
    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  // Jika gambar diunggah, upload file gambar baru
  let filename: unknown;
  if (image.size > 0) {
    const uploadedFile = await uploadFile(image);
    if (uploadedFile instanceof Error) {
      return {
        errorTitle: "Failed to upload file",
        errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
      };
    }
    filename = uploadedFile as string;
  } else {
    // Jika tidak, gunakan gambar yang sudah ada di database
    const airplane = await prisma.airplane.findFirst({
      where: { id: id },
      select: {
        image: true,
      },
    });
    filename = airplane?.image;
  }

  try {
    // Memperbarui data pesawat di database
    await prisma.airplane.update({
      where: {
        id: id,
      },
      data: {
        name: values.data.name,
        code: values.data.code,
        image: filename as string,
      },
    });
  } catch (error) {
    console.error("Error updating airplane data:", error); // Menampilkan error jika terjadi
    return {
      errorTitle: "Failed to update data",
      errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
    };
  }

  revalidatePath("/dashboard/airplanes"); // Merevalidasi path untuk memperbarui cache
  redirect("/dashboard/airplanes"); // Redirect ke halaman dashboard pesawat
}

// Fungsi untuk menghapus data pesawat berdasarkan ID
export async function deleteAirplane(
  id: string
): Promise<ActionResult | undefined> {
  // Mendapatkan data pesawat berdasarkan ID
  const data = await prisma.airplane.findFirst({
    where: {
      id: id,
    },
  });

  // Jika data tidak ditemukan, kembalikan pesan error
  if (!data) {
    return {
      errorTitle: "Data not Found",
      errorDesc: [],
    };
  }

  // Menghapus file gambar pesawat dari storage
  const deletedFile = await deleteFile(data?.image);
  if (deletedFile instanceof Error) {
    return {
      errorTitle: "Failed to delete file",
      errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
    };
  }

  try {
    // Menghapus data pesawat dari database
    await prisma.airplane.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error deleting airplane data:", error); // Menampilkan error jika terjadi
    return {
      errorTitle: "Failed to delete data",
      errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
    };
  }

  revalidatePath("/dashboard/airplanes"); // Merevalidasi path untuk memperbarui cache
}
