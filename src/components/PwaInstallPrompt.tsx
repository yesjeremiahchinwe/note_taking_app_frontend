import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setDeferredPrompt } from "@/store/pwa/pwaSlice";
import { motion } from "framer-motion";

export default function PwaInstallPrompt() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();

      dispatch(setDeferredPrompt(e));

      const hasSeen = sessionStorage.getItem("pwaInstallDismissed") || "0";
      if (+hasSeen < 2 && /Mobi|Android/i.test(navigator.userAgent)) {
        toast.info(<InstallToast promptEvent={e} />, {
          position: "bottom-center",
          autoClose: false,
          toastId: "pwa-install",
          closeOnClick: false,
          draggable: false,
        });
        sessionStorage.setItem("pwaInstallDismissed", `${+hasSeen + 1}`);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [dispatch]);

  return null;
}

function InstallToast({ promptEvent }: { promptEvent: any }) {
  const handleInstall = () => {
    promptEvent.prompt();
    promptEvent.userChoice.then(() => {
      sessionStorage.setItem("pwaInstallDismissed", "2");
    });
  };

  return (
    <motion.div
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      variants={{
        pageInitial: { opacity: 0 },
        pageAnimate: { opacity: 1 },
        pageExit: { opacity: 0 },
      }}
      className="flex lg:hidden flex-col gap-4"
    >
      <span>Install this app on your device?</span>
      <button
        onClick={handleInstall}
        className="bg-[#335cff] text-white py-3 px-6 rounded-lg cursor-pointer font-bold"
      >
        Install
      </button>
    </motion.div>
  );
}
