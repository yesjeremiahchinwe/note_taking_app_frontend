import OpenAIDrawer from "./OpenAIDrawer";
import { createRoot } from "react-dom/client";
import type { Editor } from "tinymce";

const openAIDrawerFunc = (editor: Editor) => {
  const drawerId = "ai-drawer-root";

  let rootEl = document.getElementById(drawerId);
  if (!rootEl) {
    rootEl = document.createElement("div");
    rootEl.id = drawerId;
    document.body.appendChild(rootEl);
  }

  const root = createRoot(rootEl);

  const closeDrawer = () => {
    root.unmount();
  };

  root.render(
    <OpenAIDrawer open={true} onClose={closeDrawer} editor={editor} />
  );
};

export default openAIDrawerFunc;
