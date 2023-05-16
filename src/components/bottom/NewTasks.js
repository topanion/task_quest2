import ToDoButton from "./todo/ToDoButton";
import { useState, useEffect } from "react";
import { useTodoStore } from "@/zustand/zustand";
import { db } from "@/utils/db";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function NewTasks() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const addTodo = useTodoStore((state) => state.addTodo);

  const [list, setList] = useState(null);

  useEffect(() => {
    if (user && !list)
      db.nonTakenTasks(user.id, supabase).then((e) => {
        setList(e);
      });
  }, [user, list]);

  const addTask = async (todo) => {
    db.addNewLink(user.id, todo.id, supabase).then((e) => {
      if (e) {
        const updatedList = list.filter((item) => item.id != todo.id);
        setList(updatedList);
        addTodo({ id: e.id, completed: false, text: todo.text });
      }
    });
  };

  if (!list) return <>Loading...</>;
  else {
    return (
      <div className="w-full h-full flex flex-col gap-2">
        <h1 className="font-bold">Add New Tasks : </h1>
        <div className="flex flex-col gap-2 overflow-scroll">
          {list.map((todo) => {
            return (
              <ToDoButton
                key={todo.id}
                todo={todo}
                onClick={() => addTask(todo)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
