export default function Nav({ setPage, mode }) {
  const button = ["Stats", "Tasks", "NewTasks"];
  return (
    <>
      <nav className="fixed text-black bottom-0 left-0 flex w-screen border-bottom items-center justify-evenly mb-3 lg:border-b z-10 px-[5%] py-1 text-lg font-bold">
        {button.map((e, i) => {
          return (
            <div className={``} onClick={() => setPage(e)}>
              {e}
            </div>
          );
        })}
      </nav>
    </>
  );
}
