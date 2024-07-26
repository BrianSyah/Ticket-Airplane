"use client"; // Menandakan bahwa file ini berisi kode client-side

import React, { type FC } from "react"; // Mengimpor React dan tipe FC (Functional Component)
import { ActionResult, handleSignIn } from "./actions"; // Mengimpor ActionResult interface dan handleSignIn function dari actions.tsx
import { useFormState, useFormStatus } from "react-dom"; // Mengimpor hooks untuk mengelola form state dan form status dari react-dom
import { Button } from "@/components/ui/button"; // Mengimpor komponen Button dari folder components/ui
import { Input } from "@/components/ui/input"; // Mengimpor komponen Input dari folder components/ui

// State awal untuk form sign-in
const initialFormState: ActionResult = {
  errorTitle: null, // Judul error jika ada
  errorDesc: [], // Deskripsi error jika ada
};

// Komponen untuk tombol submit
const SubmitButton = () => {
  const { pending } = useFormStatus(); // Mengambil status form (pending atau tidak)

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Loading..." : "Sign In"}{" "}
      {/* Menampilkan teks berdasarkan status pending */}
    </Button>
  );
};

// Komponen utama untuk form sign-in
const FormSignin: FC = () => {
  const [state, formAction] = useFormState(handleSignIn, initialFormState); // Mengelola state form dan action form

  return (
    <div className="w-full h-screen bg-white text-black">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm: max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your Account {/* Judul form sign-in */}
          </h2>
        </div>

        {/* Menampilkan error jika ada */}
        {state.errorTitle !== null && (
          <div className="mx-auto my-7 bg-red-500 w-[400px] p-4 rounded-lg text-white">
            <div className="font-bold mb-4">{state.errorTitle}</div>
            <ul className="list-disc list-inside">
              {state.errorDesc?.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            <Input type="Email" placeholder="Email..." name="email" />{" "}
            {/* Input untuk email */}
            <Input
              type="Password"
              placeholder="Password..."
              name="password"
            />{" "}
            {/* Input untuk password */}
            <SubmitButton /> {/* Tombol submit */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormSignin; // Mengekspor komponen FormSignin sebagai default export
