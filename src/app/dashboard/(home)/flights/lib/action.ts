"use server";
import { redirect } from "next/navigation";
import type { ActionResult } from "../../../(auth)/signin/form/actions";
import { formFlightSchema } from "./validation";
import { generateSeatPerClass } from "@/lib/utils";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveFlight(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const departureDate = new Date(formData.get("departureDate") as string);
  const arrivalDate = new Date(formData.get("arrivalDate") as string);

  const validate = formFlightSchema.safeParse({
    planeId: formData.get("planeId"),
    price: formData.get("price"),
    departureCity: formData.get("departureCity"),
    departureDate,
    departureCityCode: formData.get("departureCityCode"),
    destinationCity: formData.get("destinationCity"),
    arrivalDate,
    destinationCityCode: formData.get("destinationCityCode"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const data = await prisma.flight.create({
    data: {
      ...validate.data,
      price: Number.parseInt(validate.data.price),
    },
  });

  const seats = generateSeatPerClass(data.id);
  await prisma.flightSeat.createMany({
    data: seats,
  });

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export const getFlightById = async (id: string) => {
  try {
    const flight = await prisma.flight.findFirst({
      where: {
        id: id,
      },
    });
    return flight;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return null;
  }
};
export async function updateFlight(
  prevState: unknown,
  id: string | null,
  formData: FormData
): Promise<ActionResult> {
  if (!id) {
    return {
      errorTitle: "Prams ID missing",
      errorDesc: [],
    };
  }

  const departureDate = new Date(formData.get("departureDate") as string);
  const arrivalDate = new Date(formData.get("arrivalDate") as string);

  const validate = formFlightSchema.safeParse({
    planeId: formData.get("planeId"),
    price: formData.get("price"),
    departureCity: formData.get("departureCity"),
    departureDate,
    departureCityCode: formData.get("departureCityCode"),
    destinationCity: formData.get("destinationCity"),
    arrivalDate,
    destinationCityCode: formData.get("destinationCityCode"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }
  await prisma.flight.update({
    where: {
      id: id,
    },
    data: {
      ...validate.data,
      price: Number.parseInt(validate.data.price),
    },
  });
  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export async function deleteFlight(id: string) {
  try {
    await prisma.flightSeat.deleteMany({
      where: {
        flightId: id,
      },
    });
    await prisma.flight.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }

  revalidatePath("/dashboard/flights");
}
