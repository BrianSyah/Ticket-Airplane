import React, { type FC } from "react"; // Mengimpor React dan tipe FC (Functional Component)
import FormAirplane from "../../components/form-airplane"; // Mengimpor komponen FormAirplane
import { getAirplanesById } from "../../lib/action"; // Mengimpor fungsi getAirplanesById dari file action

// Mendefinisikan tipe untuk parameter yang diterima oleh komponen
type Params = {
  id: string; // ID pesawat yang akan diedit
};

// Mendefinisikan interface untuk properti komponen EditAirplanePage
interface EditAirplanePageProps {
  params: Params; // Parameter yang diterima oleh komponen
}

// Komponen utama untuk halaman edit pesawat
const EditAirplanePage: FC<EditAirplanePageProps> = async ({ params }) => {
  const data = await getAirplanesById(params.id); // Mendapatkan data pesawat berdasarkan ID

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Edit data maskapai</div>{" "}
        {/* Judul halaman */}
      </div>
      <FormAirplane type="EDIT" defaultValues={data} />{" "}
      {/* Form untuk mengedit pesawat dengan nilai default dari data pesawat */}
    </div>
  );
};

export default EditAirplanePage; // Mengekspor komponen EditAirplanePage sebagai default export
