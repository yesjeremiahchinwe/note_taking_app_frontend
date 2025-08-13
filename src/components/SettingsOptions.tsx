import {
  IconChevronRight,
  IconFont,
  IconLock,
  IconLogout,
  IconSun,
} from "@/lib/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "@/store/auth/authApiSlice";
import { useEffect } from "react";
import { persistor } from "@/store/store";
import { toast } from "@/hooks/use-toast";

const SettingsOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });
      toast({
        title: "Logged out successfully!.",
      });
      navigate("/login");
    }

    if (isError) {
      toast({
        title: `${
          //@ts-ignore
          error?.data?.message ||
          "Oops! Something went wrong. Please try again."
        }`,
      });
    }
  }, [isSuccess, isError]);

  const logoutOnClick = async () => {
    try {
      await sendLogout({});
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return (
    <section
      className={`${
        location.pathname === "/settings" ? "block" : "hidden lg:block"
      } basis-full lg:basis-[25%] lg:pr-4 pt-4 pb-[4rem] px-4 lg:px-0 lg:max-h-screen h-screen overflow-auto lg:border-r-[1px] border-darkerGray w-full`}
    >
      <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px]">
        Settings
      </h2>

      <article className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 pb-3 border-b-[1px] border-darkerGray">
          <Link
            to={`/settings/color-theme`}
            className={`text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-primaryText 
                ${
                  location.pathname === "/settings"
                    ? "bg-lightGray"
                    : location.pathname.includes("color-theme")
                    ? "bg-lightGray"
                    : "bg-transparent"
                }`}
          >
            <IconSun color="currentColor" />

            <span className="text-primaryText font-medium text-sm tracking-[-0.2px]">
              Color Theme
            </span>

            {location.pathname === "/settings" && (
              <IconChevronRight color="currentColor" className="ml-auto" />
            )}

            {location.pathname === "/settings/color-theme" && (
              <IconChevronRight color="currentColor" className="ml-auto" />
            )}
          </Link>

          <Link
            to={`/settings/font-theme`}
            className={`text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-primaryText ${
              location.pathname === "/settings/font-theme"
                ? "bg-lightGray"
                : "bg-transparent"
            }`}
          >
            <IconFont color="currentColor" />

            <span className="text-primaryText font-medium text-sm tracking-[-0.2px]">
              Font Theme
            </span>

            {location.pathname === "/settings/font-theme" && (
              <IconChevronRight color="currentColor" className="ml-auto" />
            )}
          </Link>

          <Link
            to={`/settings/change-password`}
            className={`text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-primaryText ${
              location.pathname === "/settings/change-password"
                ? "bg-lightGray"
                : "bg-transparent"
            }`}
          >
            <IconLock color="currentColor" />

            <span className="text-primaryText font-medium text-sm tracking-[-0.2px]">
              Change Password
            </span>

            {location.pathname === "/settings/change-password" && (
              <IconChevronRight color="currentColor" className="ml-auto" />
            )}
          </Link>
        </div>

        <div
          onClick={() => logoutOnClick()}
          role="button"
          className="text-xl flex items-center gap-3 py-3 px-2 rounded-lg font-semibold tracking-[-0.3px] text-primaryText bg-transparent hover:bg-transparent"
        >
          <IconLogout color="currentColor" />{" "}
          <span className="text-primaryText font-medium text-sm tracking-[-0.2px]">
            {isLoading ? "Logging out..." : "Logout"}
          </span>
        </div>
      </article>
    </section>
  );
};

export default SettingsOptions;
