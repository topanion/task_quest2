import React from "react";
import { useEffect } from "react";
import { useCharacterStore } from "@/zustand/zustand";

/*
 **  Empty Navbar, using title button as a JSX props and children as the list of buttons (also JSX props)
 */

export default function StatMain() {
  const character = useCharacterStore((state) => state);

  return (
    <>
      <nav className="fixed top-0 left-0 flex w-screen border-bottom items-center justify-between mb-3 lg:border-b z-10 px-[5%] py-1 text-lg font-bold">
        <span>
          {character.name} - Level {character.level}
        </span>
        <div className="">
          Energy :{" "}
          <span className={character.energy === 0 ? "text-red-700" : ""}>
            {character.energy}⚡
          </span>
        </div>
      </nav>
    </>
  );
}
