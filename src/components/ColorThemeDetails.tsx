import { IconArrowLeft, IconMoon, IconSun, IconSystemTheme } from "@/lib/icons"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const ColorThemeDetails = () => {
  return (
    <section className={`${
        location.pathname === "/" ? "hidden lg:block" : location.pathname === "/settings" ? "hidden lg:block" : "block"
      }`}>
        <Link to="/settings" className="flex lg:hidden items-center gap-1 pt-3"><IconArrowLeft /> <span>Settings</span></Link>

        <h2 className="text-[#0E121B] pt-5 lg:pt-0 font-bold lg:font-semibold text-2xl lg:text-base  tracking-[-0.5px] lg:tracking-[-0.3px]">Color Theme</h2>
        <p className="text-sm text-[#2B303B] font-normal tracking-[-0.2px] pt-2 lg:pt-0">Choose your color theme:</p>

        <article className="flex flex-col gap-4 mt-6 lg:mt-[2rem]">
            <div className="bg-[#F3F5F8] border-[1px] border-[#E0E4EA] rounded-xl px-5 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-[40px] h-[40px] rounded-[12px] bg-[#FFFFFF] border-[1px] border-[#E0E4EA] flex items-center justify-center">
                        <IconSun />
                    </div>

                    <div>
                        <h5 className="text-[#0E121B] m-0 text-sm font-medium tracking-[-0.2px]">Light Mode</h5>
                        <small className="text-[#2B303B] text-sm tracking-[-0.2px]">Pick a clean and classic light theme</small>
                    </div>
                </div>
            </div>

            <div className="bg-transparent border-[1px] border-[#E0E4EA] rounded-xl px-5 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-[40px] h-[40px] rounded-[12px] bg-[#FFFFFF] border-[1px] border-[#E0E4EA] flex items-center justify-center">
                        <IconMoon />
                    </div>

                    <div>
                        <h5 className="text-[#0E121B] m-0 text-sm font-medium tracking-[-0.2px]">Dark Mode</h5>
                        <small className="text-[#2B303B] text-sm tracking-[-0.2px]">Select a sleek and modern dark theme</small>
                    </div>
                </div>
            </div>

            <div className="bg-transparent border-[1px] border-[#E0E4EA] rounded-xl px-5 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-[40px] h-[40px] rounded-[12px] bg-[#FFFFFF] border-[1px] border-[#E0E4EA] flex items-center justify-center">
                        <IconSystemTheme />
                    </div>

                    <div>
                        <h5 className="text-[#0E121B] m-0 text-sm font-medium tracking-[-0.2px]">System</h5>
                        <small className="text-[#2B303B] text-sm tracking-[-0.2px]">Adapts to your device&apos;s theme</small>
                    </div>
                </div>
            </div>
        </article>

        <Button className="bg-[#335CFF] rounded-lg flex items-center justify-center hover:bg-[#3255e2] ml-auto my-6 py-3 px-4">Apply Changes</Button>
    </section>
  )
}

export default ColorThemeDetails