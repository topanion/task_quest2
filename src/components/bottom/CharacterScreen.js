import { useState, useEffect } from "react";
import Stats from "./Stats";

export default function CharacterScreen({ character }) {
  return (
    <>
      <Stats character={character} />
      <button className="bg-slate-600 p-1 text-white rounded-md" type="button">
        Test
      </button>
    </>
  );
}
