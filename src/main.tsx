import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import { FontProvider } from "./providers/font-provider.tsx";

// Import the register helper from the PWA plugin virtual module
import { registerSW } from "virtual:pwa-register";
import { ToastContainer } from "react-toastify";
import PwaInstallPrompt from "./components/PwaInstallPrompt.tsx";

const updateSW = registerSW({
  onRegistered() {
    // optional: console log for debug
    // toast.error('Service worker registered:', registration)
  },
  onNeedRefresh() {
    // called when there's a new SW and page should prompt user refresh
    // you can show a toast or modal to let user update
    // toast.error('New content available — please refresh.')
  },
  onOfflineReady() {
    // called when app is ready to work offline
    // toast.error('App ready to work offline')
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="notes-theme">
        <FontProvider defaultFont="sans-serif" storageKey="notes-font">
          <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>

            <ToastContainer position="top-right" autoClose={5000} />

            <PwaInstallPrompt />
          </BrowserRouter>
        </FontProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

// optionally expose updateSW to App for manual update checks
export { updateSW };
