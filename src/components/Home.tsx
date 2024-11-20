import AllNotes from "./AllNotes";
import Header from "./Header";
import RightSidebar from "./RightSidebar";

const Home = () => {
  return (
    <main className="flex flex-col w-full">
      <Header />

      <article className="flex min-h-screen items-start justify-between px-[2rem]">
       <AllNotes />

        <section className="py-5">Tags Last Edited Save Note Cancel</section>

        <RightSidebar />
      </article>
    </main>
  );
};

export default Home;
