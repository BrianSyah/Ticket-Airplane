import type { Metadata } from "next";
import React, { type FC } from "react";
import FormFlight from "../components/form-flight";
import { getAirplanes } from "../../airplanes/lib/data";

// interface CreateFlightPageProps {}
export const metadata: Metadata = {
  title: "Dashboard | Create Data Flights",
};
const CreateFlightPage: FC = async () => {
  const airplanes = await getAirplanes();

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Tambah data penerbangan</div>{" "}
      </div>
      <FormFlight airplanes={airplanes} type="ADD" />
    </div>
  );
};
export default CreateFlightPage;
