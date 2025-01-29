import {
  IconArchive,
  IconHome,
  LogoSVG,
  IconChevronRight,
  IconTag,
} from "@/lib/icons";
import { flattenAndRemoveDuplicates } from "@/lib/utils";
import { Theme } from "@/providers/theme-provider";
import { selectCurrentId } from "@/store/auth/authSlice";
import { useGetNotesQuery } from "@/store/notes/notesApiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [theme] = useState<Theme>(
    () => (localStorage.getItem("notes-theme") as Theme) || "system"
  );

  const userId = useSelector(selectCurrentId)
  const tagQueryParam = searchParams.get("tag");

  const { data: notes } = useGetNotesQuery(userId, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  // Fetch all tags (string), and convert each tag in that string into array element - resulting to array of arrays
  const allTags: string[][] = notes?.map((note) =>
    note.tags?.split(",")
  ) as string[][];

  const listOfTags = flattenAndRemoveDuplicates(allTags);

  const isHomePath =
    location.pathname.includes("/") &&
    !location.pathname.includes("/archived") &&
    !location.pathname.includes("/settings") &&
    !location.pathname.includes("/tags");

  return (
    <>
      <section className="flex lg:hidden w-full min-h-[60px] bg-lightGray text-primaryText lg:bg-transparent">
        <div className="pt-4 px-4 sm:px-[1.5rem]">
          <Link to="/">
            <LogoSVG
              color={
                theme === "system" || theme === "dark" ? "#FFF" : "#0E121B"
              }
            />
          </Link>
        </div>
      </section>

      <aside className="md:basis-[35%] xl:basis-[25%] min-h-screen hidden lg:flex flex-col border-r-[1px] border-darkerGray">
        <div className="min-h-[81px] pt-6 px-[1.85rem]">
          <Link to="/">
            <LogoSVG
              color={
                theme === "system" || theme === "dark" ? "#FFF" : "#0E121B"
              }
            />
          </Link>
        </div>

        <nav className="border-b-[1px] border-darkerGray pb-3 pt-2 mx-5">
          <ul>
            <li>
              <Link
                className={`nav-link rounded-[8px] mb-1 ${
                  isHomePath && tagQueryParam === null
                    ? "bg-lightGray"
                    : "bg-transparent"
                }`}
                to="/"
              >
                <IconHome
                  color={`${
                    location.pathname === "/"
                      ? "#335CFF"
                      : theme === "system" || theme === "dark"
                      ? "#717784"
                      : "#0E121B"
                  }`}
                />{" "}
                <span className="">All Notes</span>{" "}
                <IconChevronRight
                  className={`ml-auto ${
                    location.pathname.includes("/") &&
                    location.pathname !== "/archived" &&
                    tagQueryParam === null
                      ? "flex"
                      : "hidden"
                  }`}
                  color={
                    theme === "system" || theme === "dark" ? "#FFF" : "#0E121B"
                  }
                />
              </Link>
            </li>

            <li>
              <Link
                className={`nav-link rounded-[8px] ${
                  location.pathname.includes("/archived") &&
                  tagQueryParam === null
                    ? "bg-lightGray"
                    : "bg-transparent"
                }`}
                to="/archived"
              >
                <IconArchive
                  color={`${
                    location.pathname.includes("/archived")
                      ? "#335CFF"
                      : theme === "system" || theme === "dark"
                      ? "#717784"
                      : "#0E121B"
                  }`}
                />{" "}
                <span className="">Archived Notes</span>
                <IconChevronRight
                  className={`ml-auto ${
                    location.pathname.includes("/archived") &&
                    tagQueryParam === null
                      ? "flex"
                      : "hidden"
                  }`}
                  color={
                    theme === "system" || theme === "dark" ? "#FFF" : "#0E121B"
                  }
                />
              </Link>
            </li>
          </ul>
        </nav>

        <section className="px-[1.85rem] py-3">
          <h3 className="text-darkGray font-medium text-base leading-5 tracking-[-0.2px]">
            Tags
          </h3>

          {!notes?.length && null}

          <ul className="flex flex-col gap-1 my-4 max-h-[60vh] overflow-y-auto custom_scroll_bar">
            {listOfTags?.map((tag: any, index) => (
              <li key={index}>
                {location.pathname.includes("archived") ? (
                  <Link
                    to={`/archived/?tag=${tag}`}
                    className={`flex items-center gap-3 py-3 pl-1 pr-2 rounded-[8px] text-lightText font-medium text-sm tracking-[-0.2px] ${
                      location.pathname.includes("/archived") &&
                      tagQueryParam === tag
                        ? "bg-lightGray"
                        : "bg-transparent"
                    }`}
                  >
                    <IconTag
                      color={`${
                        location.pathname.includes("/archived") &&
                        tagQueryParam === tag
                          ? "#335CFF"
                          : theme === "system" || theme === "dark"
                          ? "#717784"
                          : "#0E121B"
                      }`}
                    />{" "}
                    <span>{tag}</span>
                    <IconChevronRight
                      className={`ml-auto ${
                        location.pathname.includes("/archived") &&
                        tagQueryParam === tag
                          ? "flex"
                          : "hidden"
                      }`}
                      color={
                        theme === "system" || theme === "dark"
                          ? "#FFF"
                          : "#0E121B"
                      }
                    />
                  </Link>
                ) : (
                  <Link
                    to={`/?tag=${tag}`}
                    className={`flex items-center gap-3 py-3 pl-1 pr-2 rounded-[8px] text-lightText font-medium text-sm tracking-[-0.2px] 
                    ${
                      location.pathname === "/" && tagQueryParam === tag
                        ? "bg-lightGray"
                        : "bg-transparent"
                    }`}
                  >
                    <IconTag
                      color={`${
                        location.pathname === "/" && tagQueryParam === tag
                          ? "#335CFF"
                          : theme === "system" || theme === "dark"
                          ? "#717784"
                          : "#0E121B"
                      }`}
                    />{" "}
                    <span>{tag}</span>
                    <IconChevronRight
                      className={`ml-auto ${
                        location.pathname === "/" && tagQueryParam === tag
                          ? "flex"
                          : "hidden"
                      }`}
                      color={
                        theme === "system" || theme === "dark"
                          ? "#FFF"
                          : "#0E121B"
                      }
                    />
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
