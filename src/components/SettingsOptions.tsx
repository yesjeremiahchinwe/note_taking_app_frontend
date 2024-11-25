import { IconChevronRight, IconFont, IconLock, IconLogout, IconSun } from "@/lib/icons";
import { Link, useLocation } from "react-router-dom";

const SettingsOptions = () => {
  const location = useLocation();

  return (
    <section className={`${location.pathname === "/settings" ? "block" : "hidden lg:block"} custom_scroll_bar basis-full lg:basis-[25%] lg:pr-4 pt-4 pb-[4rem] px-4 lg:px-0 lg:max-h-screen h-screen overflow-auto lg:border-r-[1px] border-[#E0E4EA] w-full`}>

      <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px]">Settings</h2>

      <article className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 pb-3 border-b-[1px] border-[#E0E4EA]">
              <Link to={`/settings/color-theme`} className="text-xl flex items-center gap-3 py-3 px-2 rounded-lg bg-[#F3F5F8] font-semibold tracking-[-0.3px] text-[#0E121B]">
              <IconSun /> <span className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">Color Theme</span>
              <IconChevronRight color="#E0E4EA" className="ml-auto" />
              </Link>

              <Link to={`/settings/font-theme`} className="text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-[#0E121B]">
              <IconFont /> <span className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">Font Theme</span>
              </Link>

              <Link to={`/settings/change-password`} className="text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-[#0E121B]">
              <IconLock /> <span className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">Change Password</span>
              </Link>
              </div>

              <Link to={`/settings/logout`} className="text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-[#0E121B]">
              <IconLogout /> <span className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">Logout</span>
              </Link>
          </article>
    </section>
  );
};

export default SettingsOptions;
