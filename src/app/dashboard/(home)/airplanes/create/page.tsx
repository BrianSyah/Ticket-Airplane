import React, { type FC } from "react"; // Mengimpor React dan tipe FC (Functional Component)
import FormAirplane from "../components/form-airplane"; // Mengimpor komponen FormAirplane

// interface CreateAirplanePageProps {}
// Menghilangkan interface yang tidak digunakan untuk properti komponen CreateAirplanePage

// Komponen utama untuk halaman tambah pesawat
const CreateAirplanePage: FC = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Tambah data maskapai</div>{" "}
        {/* Judul halaman */}
      </div>
      <FormAirplane type="ADD" /> {/* Form untuk menambah pesawat */}
    </div>
  );
};

export default CreateAirplanePage; // Mengekspor komponen CreateAirplanePage sebagai default export
