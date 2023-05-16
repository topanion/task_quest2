import { useState, useEffect } from "react";
import Stats from "./Stats";
import Tasks from "./Tasks";
import Nav from "../fixed/Nav";
import NewTasks from "./NewTasks";

export default function BottomScreen() {
  const [page, setPage] = useState("Tasks");

  const mode = {
    Stats: <Stats />,
    Tasks: <Tasks />,
    NewTasks: <NewTasks />,
  };

  return (
    <>
      <div className="mt-[5%] h-[50vh]">{mode[page]}</div>
      <Nav setPage={setPage} />
    </>
  );
}
