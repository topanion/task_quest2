import { useState } from "react";
import ToDoButton from "./todo/ToDoButton";
import { useCharacterStore, useTodoStore } from "@/zustand/zustand";

export default function Tasks() {
  const [list, setList] = useTodoStore((state) => [
    state.todos,
    state.setTodos,
  ]);
  const setEnergy = useCharacterStore((state) => state.getEnergy);

  // Sort todos based on the completed property
  let sortedTodos = [...list].sort((a, b) => a.completed - b.completed);

  const todoClick = (id) => {
    const tmp = list.map((todo) => {
      if (todo.id === id) {
        if (!todo.completed) setEnergy(2);
        else setEnergy(-2);

        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setList(tmp);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h1 className="font-bold">Tasks : </h1>
      <div className="flex flex-col gap-2 overflow-scroll">
        {sortedTodos.map((todo) => {
          return (
            <ToDoButton
              key={todo.id}
              todo={todo}
              onClick={() => todoClick(todo.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
