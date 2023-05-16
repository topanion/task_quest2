import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { db } from "@/utils/db";
import CharacterCreation from "@/components/settings/CharacterCreation";
import StatMain from "./fixed/StatMain";
import TopScreen from "./top/TopScreen";
import BottomScreen from "./bottom/BottomScreen";

import { useCharacterStore, useTodoStore } from "@/zustand/zustand";

const AppDisplay = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();

  const [loading, setLoading] = useState(true);

  const [character, updateCharacter] = useCharacterStore((state) => [
    state,
    state.updateCharacter,
  ]);

  const [todos, setTodos] = useTodoStore((state) => [
    state.todos,
    state.setTodos,
  ]);
  let tmp_character = null;
  let tmp_todos = null;

  useEffect(() => {
    setLoading(true);
    /*
     **
     */

    if (session && !character.name) {
      tmp_character = JSON.parse(localStorage.getItem("character"));
      tmp_todos = JSON.parse(localStorage.getItem("todos"));

      // if localstorage has a last version of character/todos, it keeps it even if there's no internet connection
      if (tmp_character && tmp_todos) {
        updateCharacter(tmp_character);
        setTodos(tmp_todos);
        return;
      }

      db.login(user.id, supabase)
        .then((e) => {
          if (!e) console.log("No character yet, let's create one !");
          else {
            updateCharacter(e);
            localStorage.setItem("character", JSON.stringify(e));
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });

      db.obtainTodos(user.id, supabase).then((e) => {
        if (e) {
          setTodos(e);
          localStorage.setItem("todos", JSON.stringify(e));
        }
      });
    }

    /*
     **
     */
    if (session && character.name && todos) {
      db.update(user.id, character, todos, supabase).catch((error) => {
        console.log("Update caught error ", error);
      });
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("character", JSON.stringify(character));
    }
    setLoading(false);
  }, [session, character]);

  return (
    <>
      <div
        className={`fixed h-screen w-screen bg-black flex transition-all duration-500 z-30 ease-in
        ${loading ? "max-h-full" : "max-h-0 overflow-hidden"}`}
      >
        <div className="m-auto text-white">Loading...</div>
      </div>
      {!session && (
        <div className="h-screen w-screen flex">
          <div className="m-auto rounded-xl px-6 py-2 bg-black/70">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google"]}
              theme="dark"
            />
          </div>
        </div>
      )}
      <div className="w-screen h-screen flex-col p-[5%] pt-[10%] bg-white">
        {session &&
          (character ? (
            <>
              <StatMain />
              <TopScreen />
              <BottomScreen />
            </>
          ) : (
            <CharacterCreation
              uid={user.id}
              setCharacter={updateCharacter}
              supabase={supabase}
            />
          ))}
      </div>
    </>
  );
};

export default AppDisplay;
