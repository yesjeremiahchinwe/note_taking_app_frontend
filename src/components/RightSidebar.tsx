import iconArchive from "/images/icon-archive.svg"
import iconDelete from "/images/icon-delete.svg"
import { Button } from "./ui/button"

const RightSidebar = () => (
    <section className="hidden lg:block basis-[25%] py-5 pl-4 h-screen border-l-[1px] border-[#E0E4EA]">
        <Button className="py-6 bg-transparent border-[1px] rounded-md hover:scale-105 duration-500 hover:bg-transparent border-[#CACFD8] mb-3 w-full" size="lg"><img src={iconArchive} alt="Archive svg icon" /> <span className="ml-1 text-[#0E121B] shadow-none tracking-[-0.2px]">Archive Note</span></Button>

        <Button className="py-6 bg-transparent border-[1px] rounded-md hover:scale-105 duration-500 hover:bg-transparent border-[#CACFD8] w-full" size="lg"><img src={iconDelete} alt="Delete svg icon" /> <span className="ml-1 text-[#0E121B] shadow-none tracking-[-0.2px]">Delete Note</span></Button>
    </section>
)

export default RightSidebar