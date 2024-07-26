"use client"; // Menandakan bahwa file ini berisi kode client-side
import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions"; // Mengimpor tipe ActionResult
import { Input } from "@/components/ui/input"; // Mengimpor komponen Input
import { Label } from "@/components/ui/label"; // Mengimpor komponen Label
import React, { type FC } from "react"; // Mengimpor React dan tipe FC (Functional Component)
import { useFormState } from "react-dom"; // Mengimpor hook useFormState dan useFormStatus dari react-dom
import { saveAirplane, updateAirplane } from "../lib/action"; // Mengimpor fungsi saveAirplane dan updateAirplane dari file action
import type { Airplane } from "@prisma/client"; // Mengimpor tipe Airplane dari Prisma Client
import SubmitFormButton from "../../components/submit-form-button";

// Mendefinisikan interface untuk properti komponen FormAirplane
interface FormAirplaneProps {
  type?: "ADD" | "EDIT"; // Menentukan tipe form, apakah untuk menambah atau mengedit pesawat
  defaultValues?: Airplane | null; // Menentukan nilai default untuk form, jika ada
}

// Status form awal dengan judul dan deskripsi error kosong
const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

// Komponen utama untuk form pesawat
const FormAirplane: FC<FormAirplaneProps> = ({ type, defaultValues }) => {
  // Fungsi untuk memperbarui pesawat dengan ID yang diberikan
  const updateAirplaneWithId = (_state: ActionResult, formData: FormData) =>
    updateAirplane(null, defaultValues?.id!!, formData);

  // Menggunakan hook useFormState untuk mengelola state form dan menentukan aksi form
  const [state, formAction] = useFormState(
    type === "ADD" ? saveAirplane : updateAirplaneWithId, // Menentukan fungsi aksi berdasarkan tipe form
    initialFormState // Menggunakan status form awal
  );

  return (
    <form action={formAction} className="w-[40%] space-y-4">
      {" "}
      {/* Form untuk pesawat */}
      {/* Menampilkan pesan error jika ada */}
      {state.errorTitle !== null && (
        <div className="my-7 bg-red-500 p-4 rounded-lg text-white">
          <div className="font-bold mb-4">{state.errorTitle}</div>
          <ul className="list-disc list-inside">
            {state.errorDesc?.map((value, index) => (
              <li key={index + value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Input untuk kode pesawat */}
      <div className="space-y-2">
        <Label htmlFor="code">Code</Label>
        <Input
          placeholder="Kode Pesawaat..."
          name="code"
          id="code"
          required
          defaultValue={defaultValues?.code} // Nilai default untuk input kode
        />
      </div>
      {/* Input untuk nama pesawat */}
      <div className="space-y-2">
        <Label htmlFor="name">Nama</Label>
        <Input
          placeholder="Nama Pesawaat..."
          name="name"
          id="name"
          required
          defaultValue={defaultValues?.name} // Nilai default untuk input nama
        />
      </div>
      {/* Input untuk upload gambar pesawat */}
      <div className="space-y-2">
        <Label htmlFor="image">Upload Foto</Label>
        <Input
          type="file"
          placeholder="Upload Foto..."
          name="image"
          id="image"
          required
        />
      </div>
      {/* Tombol submit */}
      <SubmitFormButton />
    </form>
  );
};
export default FormAirplane;
