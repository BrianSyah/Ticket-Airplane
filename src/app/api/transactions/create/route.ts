import type { NextRequest } from "next/server";
import prisma from "../../../../../lib/prisma";
import { makeid } from "@/lib/utils";

const MIDTRANS_URL = process.env.NEXT_PUBLIC_MIDTRANS_TRANSACTION_URL ?? "";
const MIDTRANS_AUTH_KEY = process.env.NEXT_PUBLIC_MIDTRANS_AUTH_KEY ?? "";
export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const transactions = await prisma.ticket.create({
      data: {
        bookingDate: body.bookingDate,
        price: body.price,
        status: "PENDING",
        customerId: body.customerId,
        flightId: body.flightId,
        seatId: body.seatId,
        code: `TRX${makeid(7)}`,
      },
    });

    await prisma.flightSeat.update({
      where: {
        id: transactions.seatId,
      },
      data: {
        isBooked: true,
      },
    });

    // Handle for midtrands
    const parameter = {
      transaction_details: {
        order_id: transactions.id,
        gross_amount: body.price,
      },
      credit_card: {
        secure: true,
      },
      item_details: [
        {
          id: body.flightId,
          price: body.price,
          quantity: 1,
          name: `Ticket Pesawat ${body.departureCityCode} - ${body.destinationCityCode}`,
        },
      ],
    };

    const resMidtrans = await fetch(MIDTRANS_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Basic ${MIDTRANS_AUTH_KEY}`,
      },
      body: JSON.stringify(parameter),
    });

    const midtrans = await resMidtrans.json();
    await prisma.ticket.update({
      where: {
        id: transactions.id,
      },
      data: {
        tokenMidtrans: midtrans.token,
      },
    });

    return Response.json({ midtrans, transactions_id: transactions.id });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return Response.json({ error }, { status: 500 });
  }
}
