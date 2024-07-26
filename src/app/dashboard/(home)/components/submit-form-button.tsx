import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitFormButton() {
  const { pending } = useFormStatus(); // Mendapatkan status form, apakah sedang diproses atau tidak

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {" "}
      {/* Tombol submit */}
      {pending ? "Loading" : "Submit"}{" "}
      {/* Menampilkan teks "Loading" saat form sedang diproses */}
    </Button>
  );
}
