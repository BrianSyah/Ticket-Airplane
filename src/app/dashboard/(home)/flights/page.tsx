import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React, { type FC } from "react";
import { columns } from "./components/columns-flight";
import { getFlights } from "./lib/data";

// interface FlightsPageProps {}

export const metadata: Metadata = {
  title: "Dashboard | Fights",
};
const FlightPage: FC = async () => {
  const flight = await getFlights();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Flights</div>
        <Button asChild>
          <Link href={"/dashboard/flights/create"}>
            <Plus className=" h-4 w-7" />
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={flight} />
    </>
  );
};
export default FlightPage;
