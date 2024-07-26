import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

import { getAirplanes } from "./lib/data";
import { columns } from "./components/column-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Airplanes",
};

export default async function AirplanePage() {
  const planes = await getAirplanes();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Airplanes</div>
        <Button asChild>
          <Link href={"/dashboard/airplanes/create"}>
            <Plus className=" h-4 w-7" />
            Tambah Data
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={planes} />
    </>
  );
}
