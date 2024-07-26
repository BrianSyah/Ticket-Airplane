import React, { FC } from "react";
import { Metadata } from "next";
import FormSignin from "./form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface SignInPageProps {}

export const metadata: Metadata = {
  title: "Dashboard | SignIn",
};

const SignInPage: FC<SignInPageProps> = async () => {
  const { session, user } = await getUser();

  if (session && user.role === "ADMIN") {
    redirect("/dashboard");
  }

  return <FormSignin />;
};
export default SignInPage;
