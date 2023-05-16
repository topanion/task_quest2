import React from "react";
import { useEffect } from "react";
import { useCharacterStore } from "@/zustand/zustand";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Stats() {
  const character = useCharacterStore((state) => state);
  const supabase = useSupabaseClient();

  return (
    <div className="w-full justify-left p-2 font-bold">
      <div className="flex flex-col w-fit">
        <p>Name : {character.name}</p>
        <p>Class : {character.class}</p>
        <p>Level : {character.level}</p>
        <p>Current Energy : {character.energy}⚡</p>
      </div>
      <div
        className="border rounded-md p-1"
        onClick={() => supabase.auth.signOut()}
      >
        Logout
      </div>
    </div>
  );
}
