import { IconChevronRight, IconFont, IconLock, IconLogout, IconSun } from "@/lib/icons"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "@/store/auth/authApiSlice";

const SettingsOptions = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const [sendLogout, { isLoading }] = useSendLogoutMutation()

  const logoutOnClick = async () => {
    try {
      await sendLogout({})
      navigate("/")
    } catch (err: any) {
      console.log(err?.message)
    }
  }

  return (
    <section className={`${location.pathname === "/settings" ? "block" : "hidden lg:block"} custom_scroll_bar basis-full lg:basis-[25%] lg:pr-4 pt-4 pb-[4rem] px-4 lg:px-0 lg:max-h-screen h-screen overflow-auto lg:border-r-[1px] border-[#E0E4EA] w-full`}>

      <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px]">Settings</h2>

      <article className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 pb-3 border-b-[1px] border-[#E0E4EA]">
              <Link to={`/settings/color-theme`} className={`text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-[#0E121B] 
                ${location.pathname === "/settings" ? "bg-[#F3F5F8]" : location.pathname.includes("color-theme") ? "bg-[#F3F5F8]" : "bg-transparent"}`}>
              <IconSun />

              <span className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">Color Theme</span>

              {location.pathname === "/settings" && <IconChevronRight color="#E0E4EA" className="ml-auto" />}

              {location.pathname === "/settings/color-theme" && <IconChevronRight color="#E0E4EA" className="ml-auto" />}
              </Link>

              <Link to={`/settings/font-theme`} className={`text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-[#0E121B] ${location.pathname === "/settings/font-theme" ? "bg-[#F3F5F8]" : "bg-transparent"}`}>
              <IconFont /> 
              
              <span className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">Font Theme</span>

              {location.pathname === "/settings/font-theme" && <IconChevronRight color="#E0E4EA" className="ml-auto" />}
              </Link>

              <Link to={`/settings/change-password`} className={`text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-[#0E121B] ${location.pathname === "/settings/change-password" ? "bg-[#F3F5F8]" : "bg-transparent"}`}>
              <IconLock />
              
              <span className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">Change Password</span>

              {location.pathname === "/settings/change-password" && <IconChevronRight color="#E0E4EA" className="ml-auto" />}
              </Link>
              </div>

              <div onClick={() => logoutOnClick()} role="button" aria-role="button" className="text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-[#0E121B] bg-transparent hover:bg-transparent">
              <IconLogout /> <span className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">{isLoading ? "Logging out..." : "Logout"}</span>
              </div>
          </article>
    </section>
  );
};

export default SettingsOptions;
