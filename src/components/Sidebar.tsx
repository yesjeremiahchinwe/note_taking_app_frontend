import { tags } from "@/lib/constants";
import {
  IconArchive,
  IconHome,
  LogoSVG,
  IconChevronRight,
  IconTag,
} from "@/lib/icons";
import { Link, NavLink, useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Get a query parameter
  const archivedQueryParam = searchParams.get("archived")

  // Set a query parameter
  // setSearchParams({ myParam: "myValue"})

  // Remove a query parameter
  // setSearchParams((params) => {
  //     params.delete("myParam")
  //     return params
  // })

  return (
    <>
      <section className="flex lg:hidden w-full min-h-[60px] bg-[#F3F5F8] lg:bg-transparent">
        <div className="pt-4 px-[1.85rem]">
          <Link to="/">
            <LogoSVG />
          </Link>
        </div>
      </section>

      <aside className="md:basis-[35%] xl:basis-[25%] min-h-screen hidden lg:flex flex-col border-r-[1px] border-[#E0E4EA]">
        <div className="min-h-[81px] pt-6 px-[1.85rem]">
          <Link to="/">
            <LogoSVG />
          </Link>
        </div>

        <nav className="border-b-[1px] border-[#E0E4EA] pb-3 pt-2 mx-5">
          <ul>
            <li>
              <Link className={`nav-link bg-[#F3F5F8] rounded-[8px] mb-1 ${location.pathname === "/" && !archivedQueryParam ? "bg-[#F3F5F8]" : "bg-transparent"}`} to="/">
                <IconHome color="#0E121B" /> <span className="">All Notes</span>{" "}
                <IconChevronRight className="ml-auto" />
              </Link>
            </li>
            <li>
              <Link className={`nav-link rounded-[8px] ${archivedQueryParam ? "bg-[#F3F5F8]" : "bg-transparent"}`} to="/?archived=1">
                <IconArchive color="#0E121B" />{" "}
                <span className="">Archived Notes</span>
              </Link>
            </li>
          </ul>
        </nav>

        <section className="px-[1.85rem] py-3">
          <h3 className="text-[#717784] font-medium text-base leading-5 tracking-[-0.2px]">
            Tags
          </h3>

          <ul className="flex flex-col gap-6 my-5">
            {tags.map((tag, index) => (
              <li key={index}>
                <NavLink
                  to="/"
                  className="flex items-center gap-3 text-[#2B303B] font-medium text-base tracking-[-0.2px]"
                >
                  <IconTag color="#0E121B" /> <span>{tag}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  );
};

export default Sidebar;
