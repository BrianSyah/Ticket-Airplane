import { z } from "zod";

// required_error: "Blom Di pakai"
export const formSchema = z.object({
  email: z
    .string({ required_error: "Email Harus Diisi!" })
    .email({ message: "Email Tidak Valid" }),
  password: z
    .string({ required_error: "Password Harus Diisi!" })
    .min(5, { message: "Passowrd harus memiliki minimal 5 karakter" }),
});
