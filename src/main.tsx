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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="notes-theme">
        <FontProvider defaultFont="sans-serif" storageKey="notes-font">
          <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </BrowserRouter>
        </FontProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
