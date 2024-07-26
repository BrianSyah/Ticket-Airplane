"use client"; // Menandakan bahwa file ini berisi kode client-side

import { Button } from "@/components/ui/button"; // Mengimpor komponen Button dari direktori komponen UI
import type { Airplane } from "@prisma/client"; // Mengimpor tipe Airplane dari Prisma Client
import type { ColumnDef } from "@tanstack/react-table"; // Mengimpor tipe ColumnDef dari @tanstack/react-table
import { Pencil } from "lucide-react"; // Mengimpor ikon Pencil dan Trash dari lucide-react
import Link from "next/link"; // Mengimpor Link dari next/link untuk navigasi
import { getUrlFile } from "../../../../../lib/supabase"; // Mengimpor fungsi getUrlFIle dari supabase
import Image from "next/image"; // Mengimpor komponen Image dari next/image
import DeleteAirplane from "./delete-airplane"; // Mengimpor komponen DeleteAirplane dari file delete-airplane

// Mendefinisikan kolom-kolom tabel untuk menampilkan data pesawat
export const columns: ColumnDef<Airplane>[] = [
  {
    accessorKey: "image", // Kolom untuk gambar pesawat
    header: "Image", // Judul kolom
    cell: ({ row }) => {
      const plane = row.original; // Mendapatkan data pesawat dari baris tabel

      return (
        <Image
          src={getUrlFile(plane.image)} // Mengambil URL gambar pesawat
          alt="Image airplane" // Alt text untuk gambar
          width={180} // Lebar gambar
          height={180} // Tinggi gambar
        />
      );
    },
  },
  {
    accessorKey: "code", // Kolom untuk kode pesawat
    header: "Code", // Judul kolom
  },
  {
    accessorKey: "name", // Kolom untuk nama pesawat
    header: "Name", // Judul kolom
  },
  {
    id: "actions", // Kolom untuk aksi (edit dan hapus)
    cell: ({ row }) => {
      const plane = row.original; // Mendapatkan data pesawat dari baris tabel
      return (
        <div className="inline-flex gap-5 items-center">
          {" "}
          {/* Kontainer untuk tombol aksi */}
          <Button asChild variant="secondary" size={"sm"}>
            <Link href={`/dashboard/airplanes/edit/${plane.id}`}>
              {" "}
              {/* Link untuk mengedit pesawat */}
              <Pencil className="h-4 w-7" />{" "}
              {/* Ikon Pencil untuk tombol edit */}
              Edit
            </Link>
          </Button>
          <DeleteAirplane id={plane.id} />{" "}
          {/* Komponen untuk menghapus pesawat */}
        </div>
      );
    },
  },
];
