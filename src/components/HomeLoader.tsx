import { cn } from "@/lib/utils";
import loaderGif from "/images/loadingUI.gif";
import loaderGifDark from "/images/loaderUIDark.gif";
import { useState } from "react";
import { Theme } from "@/providers/theme-provider";

const LoadiingState = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  const [theme] = useState<Theme>(
    () => (localStorage.getItem("notes-theme") as Theme) || "system"
  );

  return (
    <section
      className={cn(
        "w-full h-screen flex items-center justify-center",
        className
      )}
    >
      <div className="flex flex-col gap-3 items-center justify-center z-10">
        {theme === "system" || theme === "dark" ? (
          <img src={loaderGifDark} alt="Loading state Gif" />
        ) : (
          <img src={loaderGif} alt="Loading state Gif" />
        )}
        <p className="italic text-base">{message}...</p>
      </div>
    </section>
  );
};
export default LoadiingState;
