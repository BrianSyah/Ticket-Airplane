"use client";

import { Button } from "@/components/ui/button"; // Mengimpor komponen Button dari direktori komponen UI
import { Trash } from "lucide-react"; // Mengimpor ikon Trash dari lucide-react
import React, { type FC } from "react"; // Mengimpor React dan tipe FC (Function Component) dari react
import { useFormStatus } from "react-dom"; // Mengimpor hook useFormStatus dari react-dom
import { deleteAirplane } from "../lib/action"; // Mengimpor fungsi deleteAirplane dari direktori lib/action

// Mendefinisikan tipe props untuk komponen DeleteAirplane
interface DeleteAirplaneProps {
  id: string; // Properti id adalah string yang mewakili ID pesawat yang akan dihapus
}

// Komponen SubmitButton untuk menampilkan tombol submit
function SubmitButton() {
  // Menggunakan hook useFormStatus untuk mendapatkan status form
  const { pending } = useFormStatus();

  // Mengembalikan tombol dengan properti yang sesuai
  return (
    <Button size="sm" type="submit" variant={"destructive"} disabled={pending}>
      <Trash className="mr-2 h-4 w-4" />{" "}
      {/* Menampilkan ikon Trash di dalam tombol */}
      Hapus {/* Teks yang muncul di tombol */}
    </Button>
  );
}

// Komponen utama DeleteAirplane
const DeleteAirplane: FC<DeleteAirplaneProps> = ({ id }) => {
  // Mengikat fungsi deleteAirplane dengan ID pesawat yang diberikan
  const deleteAirplaneWithId = deleteAirplane.bind(null, id);

  // Mengembalikan form yang memanggil deleteAirplaneWithId ketika disubmit
  return (
    <form action={deleteAirplaneWithId}>
      <SubmitButton /> {/* Menampilkan tombol submit di dalam form */}
    </form>
  );
};

// Mengekspor komponen DeleteAirplane sebagai default export
export default DeleteAirplane;
