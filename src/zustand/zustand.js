import { create } from "zustand";

export const useCharacterStore = create((set) => ({
  name: null,
  class: "",
  energy: 0,
  getEnergy: (value) => set((state) => ({ energy: state.energy + value })),
  level: 0,
  gold: 0,
  experience: 0,

  updateCharacter: (character) => set(() => ({ ...character })),
}));

export const useTodoStore = create((set) => ({
  todos: [],
  setTodos: (newlist) => set(() => ({ todos: newlist })),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
}));
