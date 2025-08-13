import { cn } from "@/lib/utils";
import loaderGif from "/images/tube-spinner.svg";

const LoadiingState = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "w-full h-screen flex items-center justify-center",
        className
      )}
    >
      <div className="flex flex-col gap-3 items-center justify-center z-10">
        <img src={loaderGif} alt="Loading state Gif" />
        <p className="italic text-sm">{message}...</p>
      </div>
    </section>
  );
};
export default LoadiingState;
