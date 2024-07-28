import prisma from "../../../../../lib/prisma";

export const getMyTickets = async (id: string | undefined) => {
  try {
    const data = await prisma.ticket.findMany({
      where: {
        customerId: id,
      },
      select: {
        id: true,
        flight: {
          select: {
            plane: true,
            departureCityCode: true,
            destinationCityCode: true,
            departureDate: true,
            arrivalDate: true,
          },
        },
        seat: {
          select: {
            type: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return [];
  }
};

export const getDetailTicket = async (id: string) => {
  try {
    const data = await prisma.ticket.findFirst({
      where: {
        id: id,
      },
      include: {
        flight: {
          include: {
            plane: true,
          },
        },
        customer: true,
        seat: true,
      },
    });
    return data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return null;
  }
};
