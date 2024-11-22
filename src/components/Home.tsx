import { Outlet } from "react-router-dom";
import AllNotes from "./AllNotes";
import Header from "./Header";
import RightSidebar from "./RightSidebar";

const Home = () => {
  return (
    <main className="flex flex-col w-full">
      <Header />

      <article className="flex min-h-screen items-start justify-between px-[2rem]">
       <AllNotes />

        <section className="py-5">
          <Outlet />
        </section>

        <RightSidebar />
      </article>
    </main>
  );
};

export default Home;
