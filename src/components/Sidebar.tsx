import { tags } from "@/lib/constants";
import {
  IconArchive,
  IconHome,
  LogoSVG,
  IconChevronRight,
  IconTag,
} from "@/lib/icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation()
  const isHomePath = location.pathname.includes("/") && !location.pathname.includes("/archived") && !location.pathname.includes("/settings") && !location.pathname.includes("/tags")

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
              <Link className={`nav-link bg-[#F3F5F8] rounded-[8px] mb-1 ${isHomePath ? "bg-[#F3F5F8]" : "bg-transparent"}`} to="/">
                <IconHome color="#0E121B" /> <span className="">All Notes</span>{" "}
                <IconChevronRight className={`ml-auto ${location.pathname.includes("/") && location.pathname !== "/archived" ? 'flex' : 'hidden'}`} />
              </Link>
            </li>
            <li>
              <Link className={`nav-link rounded-[8px] ${location.pathname.includes("/archived") ? "bg-[#F3F5F8]" : "bg-transparent"}`} to="/archived">
                <IconArchive color="#0E121B" /> <span className="">Archived Notes</span>
                <IconChevronRight className={`ml-auto ${location.pathname.includes("/archived") ? 'flex' : 'hidden'}`} />
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
                <Link
                  to={`/tags/${tag.toLowerCase()}`}
                  className="flex items-center gap-3 text-[#2B303B] font-medium text-base tracking-[-0.2px]"
                >
                  <IconTag color="#0E121B" /> <span>{tag}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  );
};

export default Sidebar;
