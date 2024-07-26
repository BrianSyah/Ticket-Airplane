"use client";
import type { Flight, FlightSeat, Ticket, User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import ColumnRoutePage from "../../flights/components/column-route-flight";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TicketType = Ticket & {
  flight: Flight;
  customer: User;
  seat: FlightSeat;
};

export const columns: ColumnDef<TicketType>[] = [
  {
    accessorKey: "customerId",
    header: "Nama Penumbang",
    cell: ({ row }) => {
      const ticket = row.original;
      return ticket.customer.name;
    },
  },
  {
    accessorKey: "flightId",
    header: "Detail Penerbangan",
    cell: ({ row }) => {
      const ticket = row.original;
      return <ColumnRoutePage flight={ticket.flight} />;
    },
  },
  {
    accessorKey: "seatId",
    header: "Nomer Kursi",
    cell: ({ row }) => {
      const ticket = row.original;

      return <Badge>{ticket.seat.seatNumber}</Badge>;
    },
  },
  {
    id: "status_transaction",
    header: "Status Transaksi",
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <div className="space-y-1">
          <Badge
            className={cn(
              ticket.status === "SUCCESS"
                ? "bg-green-500"
                : ticket.status === "PENDING"
                ? "bg-yellow-500"
                : "bg-red-500"
            )}
          >
            {ticket.status}
          </Badge>
          <div>
            <span>Metode Pembayaran</span>
          </div>
        </div>
      );
    },
  },
];
