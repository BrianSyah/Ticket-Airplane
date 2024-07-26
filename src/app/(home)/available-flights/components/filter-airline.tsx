import React from "react";
import { getAirplanes } from "../../lib/data";
import CheckBoxAirlane from "./checkbox-airlane";

export default async function FilterAirline() {
  const airplanes = await getAirplanes();

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {airplanes.map((val, i) => (
        <CheckBoxAirlane key={`${val.id + i}`} val={val} />
      ))}
    </div>
  );
}
