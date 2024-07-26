"use server";
import prisma from "../../../../../../lib/prisma";

export const getCustomers = async () => {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "CUSTOMER",
      },
    });
    return customers;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return [];
  }
};
