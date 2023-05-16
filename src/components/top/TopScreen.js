import React from "react";
import { useCharacterStore } from "@/zustand/zustand";

export default function TopScreen({}) {
  const character = useCharacterStore((state) => state);

  const getImageSource = () => {
    if (character.class === "Mage") {
      return "/sprites/mage.png";
    } else if (character.class === "Archer") {
      return "/sprites/archer.png";
    } else {
      return "/sprites/warrior.png";
    }
  };

  return (
    <div className="m-auto flex flex-col items-center">
      <div
        className="relative lg:w-[50%] md:w-[70%] w-[100%] h-[30vh] flex rounded-2xl"
        style={{
          backgroundImage: `url('/background/moss.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={getImageSource()}
          alt={character.class}
          className="absolute left-[10%] bottom-[10%] lg:w-[20%] md:w-[15%] w-24 animate-bounce-short"
        />
      </div>
    </div>
  );
}
