import { tags } from "@/lib/constants"
import { IconArchive, IconHome, LogoSVG, IconChevronRight, IconTag } from "@/lib/icons"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
    // const [searchParams, setSearchParams] = useSearchParams()

    // Get a query paramete
    // const myParam = searchParams.get("myParam")

    // Set a query parameter
    // setSearchParams({ myParam: "myValue"})

    // Remove a query parameter
    // setSearchParams((params) => {
    //     params.delete("myParam")
    //     return params
    // })

    return (
        <>
        <section className="w-full min-h-[80px] fixed top-0 bg-[#E0E4EA] lg:bg-transparent">
        <div className="min-h-[81px] pt-6 px-[1.85rem]">
            <LogoSVG />
            </div>
        </section>

        <aside className="md:basis-[35%] xl:basis-[25%] min-h-screen hidden lg:flex flex-col border-r-[1px] border-[#E0E4EA]">
            <div className="min-h-[81px] pt-6 px-[1.85rem]">
            <LogoSVG />
            </div>
    
            <nav className="border-b-[1px] border-[#E0E4EA] pb-3 pt-2 mx-5">
                <ul>
                    <li>
                        <a className="nav-link bg-[#F3F5F8] rounded-[8px] mb-1" href=""><IconHome /> <span className="">All Notes</span> <IconChevronRight className="ml-auto" /></a>
                    </li>
                    <li>
                        <a className="nav-link" href=""><IconArchive /> <span className="">Archived Notes</span></a>
                    </li>
                </ul>
            </nav>
    
            <section className="px-[1.85rem] py-3">
                <h3 className="text-[#717784] font-medium text-base leading-5 tracking-[-0.2px]">Tags</h3>
    
                <ul className="flex flex-col gap-6 my-5">
                    {tags.map((tag, index) => (
                        <li key={index}>
                            <NavLink to="/" className="flex items-center gap-3 text-[#2B303B] font-medium text-base tracking-[-0.2px]">
                            <IconTag /> <span>{tag}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </section>
        </aside>
        </>
    )
}

export default Sidebar