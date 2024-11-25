import Header from "@/components/Header"
import NotesWithTag from "@/components/NotesWithTag"
import RightSidebar from "@/components/RightSidebar"
import { tags } from "@/lib/constants"
import { IconTag } from "@/lib/icons"
import { NavLink, Outlet } from "react-router-dom"

const TagsPage = () => {
  return (
    <section className="flex flex-col w-full bg-[#F3F5F8] rounded-t-md lg:rounded-t-none">
    <Header />

    <article className="flex rounded-t-[1.25rem] lg:rounded-t-none bg-white flex-col lg:flex-row min-h-screen items-start justify-between lg:pr-[2rem] lg:pl-6 w-full">
     <NotesWithTag />

      <div className="basis-full w-full pb-5 lg:basis-[50%] lg:p-5">
        <Outlet />
      </div>

      <RightSidebar />
    </article>
  </section>
    // <section className="block px-[1.85rem] pt-3 pb-[6rem] min-h-screen">
    //       <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px]">
    //         Tags
    //       </h2>

    //       <ul className="flex flex-col gap-6 my-5">
    //         {tags.map((tag, index) => (
    //           <li key={index} className={`${index === tags.length - 1 ? "border-t-0" : "border-b-[1px] border-[#E0E4EA]"} pb-4`}>
    //             <NavLink
    //               to={`/tags/${tag.toLowerCase()}`}
    //               className="flex items-center gap-3 text-[#2B303B] font-medium text-base tracking-[-0.2px]"
    //             >
    //               <IconTag color="#0E121B" /> <span>{tag}</span>
    //             </NavLink>
    //           </li>
    //         ))}
    //       </ul>
    //     </section>
  )
}

export default TagsPage