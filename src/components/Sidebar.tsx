import { tags } from "@/lib/constants";
import {
  IconArchive,
  IconHome,
  LogoSVG,
  IconChevronRight,
  IconTag,
} from "@/lib/icons";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams();

  const tagQueryParam = searchParams.get("tag");

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

          <ul className="flex flex-col gap-1 my-4">
            {tags.map((tag, index) => (
              <li key={index}>
                {location.pathname.includes("archived") ? (
                  <Link
                  to={`/archived/?tag=${tag}`}
                  className={`flex items-center gap-3 py-3 pl-1 pr-2 rounded-[8px] text-[#2B303B] font-medium text-base tracking-[-0.2px] ${location.pathname.includes("/archived") && tagQueryParam === tag ? "bg-[#F3F5F8]" : "bg-transparent"}`}
                >
                  <IconTag color="#0E121B" /> <span>{tag}</span>
                  <IconChevronRight className={`ml-auto ${location.pathname.includes("/archived") && tagQueryParam === tag ? 'flex' : 'hidden'}`} />
                </Link>
                ) : (
                  <Link
                  to={`/?tag=${tag}`}
                  className={`flex items-center gap-3 py-3 pl-1 pr-2 rounded-[8px] text-[#2B303B] font-medium text-base tracking-[-0.2px] 
                    ${location.pathname === "/" && tagQueryParam === tag ? "bg-[#F3F5F8]" : "bg-transparent"}`}
                >
                  <IconTag color="#0E121B" /> <span>{tag}</span>
                  <IconChevronRight className={`ml-auto ${location.pathname === "/" && tagQueryParam === tag ? 'flex' : 'hidden'}`} />
                </Link>
                )}
                
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  );
};

export default Sidebar;
