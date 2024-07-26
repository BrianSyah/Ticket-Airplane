"use server";

import prisma from "../../../../../../lib/prisma";

export const getTickets = async () => {
  try {
    const ticket = await prisma.ticket.findMany({
      include: {
        flight: true,
        customer: true,
        seat: true,
      },
    });
    return ticket;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return [];
  }
};
