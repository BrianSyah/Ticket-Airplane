import type { Metadata } from "next";
import React, { type FC } from "react";
import { getAirplanes } from "../../../airplanes/lib/data";
import FormFlight from "../../components/form-flight";
import { getFlightById } from "../../lib/action";

type Params = {
  id: string;
};

interface EditFlightPageProps {
  params: Params;
}

// interface createFlightPageProps {}
export const metadata: Metadata = {
  title: "Dashboard | Edit Data Flights",
};

const EditFlightPage: FC<EditFlightPageProps> = async ({ params }) => {
  const airplanes = await getAirplanes();
  const flight = await getFlightById(params.id);

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Edit data penerbangan</div>{" "}
      </div>
      <FormFlight airplanes={airplanes} defaultValues={flight} type="EDIT" />
    </div>
  );
};
export default EditFlightPage;
