export default function ToDoButton({ todo, onClick }) {
  return (
    <div
      onClick={() => onClick()}
      className={`rounded-md border p-1 shadow-md ${
        todo.completed ? "opacity-40" : "opacity-100"
      }`}
    >
      {todo.text}
    </div>
  );
}
