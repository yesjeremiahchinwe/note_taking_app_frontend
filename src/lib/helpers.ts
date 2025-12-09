import { toast } from "react-toastify";
import { debounce } from "./utils";
import { useCallAIMutation } from "@/store/notes/notesApiSlice";
import openAIDrawerFunc from "@/components/openAIDrawerFunc";
import type { Editor } from "tinymce";

// Helper: call backend
export const callAI = async ({
  userId,
  action,
  text,
  promptExtra,
}: {
  userId: string;
  action: string;
  text: string;
  promptExtra: any;
}) => {
  const payload = { userId, action, text, promptExtra };

  const r = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/ai/generate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!r.ok) {
    const err = await r.text();
    const parseError = JSON.parse(err);
    //@ts-ignore
    toast.error("AI error: " + (parseError?.error || parseError?.data?.error));
    throw new Error(err);
  }

  const json = await r.json();
  return json.output; // expect { output: '<html or text>' }
};

export const aiSetupFunction = (editor: Editor) => {
  // 1) Add custom toolbar button (quick access)
  editor.ui.registry.addButton("aiButton", {
    text: "✨ Ask AI",
    onAction: () => {
      removeFloatingBadge();
      openAIDrawerFunc(editor);
    },
  });

  // Floating action on selection with debounce
  editor.on(
    "SelectionChange",
    debounce(function () {
      const selectedText = editor.selection.getContent({
        format: "text",
      });

      removeFloatingBadge();

      if (selectedText && selectedText.trim().length > 3) {
        showFloatingBadge(editor);
      }
    }, 300) // wait 300ms after the last selection change
  );

  function showFloatingBadge(editor: Editor) {
    // Get current selection range
    const rng = editor.selection.getRng();
    if (!rng) return;

    const rect = rng.getBoundingClientRect();
    if (!rect) return;

    const parentElement = document.getElementById("editor-container");

    // Remove existing badge first
    const existing = document.getElementById("ai-floating-badge");
    if (existing) existing.remove();

    const badge = document.createElement("div");
    badge.id = "ai-floating-badge";
    badge.style.position = "absolute";
    badge.style.display = "grid";
    badge.style.padding = "0.5rem 1rem";
    badge.style.minWidth = "180px";
    (badge.style.gap = "0.85rem"), (badge.style.zIndex = "9999");
    badge.style.background = "#fff";
    badge.style.color = "#222";
    badge.style.border = "1px solid #ddd";
    badge.style.borderRadius = "6px";
    badge.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

    // ✅ Position below selected text
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    badge.style.top = `${rect.bottom + scrollTop + 110}px`; // 8px below text
    badge.style.left = `${rect.left + scrollLeft}px`;

    badge.innerHTML = `
<button type="button" id="ai-improve">🚀 Improve</button>
<button type="button" id="ai-summarize">📝 Summarize</button>
<button type="button" id="ai-expand">📈 Expand</button>
<button type="button" id="ai-checklist">✅ Checklist</button>
<button type="button" id="ai-rewrite">✨ Rewrite</button>
  `;

    if (parentElement) {
      parentElement.appendChild(badge);
    }

    // ==== Keep your logic below ====
    const aiImproveBtn = document.getElementById("ai-improve");

    if (aiImproveBtn) {
      aiImproveBtn.onclick = async () => {
        const selected = editor.selection.getContent({
          format: "text",
        });
        const userId = localStorage.getItem("userId") ?? "";

        const res = await callAI({
          userId,
          action: "improve",
          text: selected,
          promptExtra: "",
        });
        editor.selection.setContent(res);

        removeFloatingBadge();
      };
    }

    const aiSummarizeBtn = document.getElementById("ai-summarize");

    if (aiSummarizeBtn) {
      aiSummarizeBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const selected = editor.selection.getContent({
          format: "text",
        });

        const userId = localStorage.getItem("userId") ?? "";

        const res = await callAI({
          userId,
          action: "summarize",
          text: selected,
          promptExtra: "",
        });
        editor.selection.setContent(res);
        removeFloatingBadge();
      });
    }

    const aiExpandBtn = document.getElementById("ai-expand");

    if (aiExpandBtn) {
      aiExpandBtn.onclick = async () => {
        const selected = editor.selection.getContent({
          format: "text",
        });
        const userId = localStorage.getItem("userId") ?? "";

        const res = await callAI({
          userId,
          action: "expand",
          text: selected,
          promptExtra: "",
        });
        editor.selection.setContent(res);

        removeFloatingBadge();
      };
    }

    const aiChecklistBtn = document.getElementById("ai-checklist");

    if (aiChecklistBtn) {
      aiChecklistBtn.onclick = async () => {
        const selected = editor.selection.getContent({
          format: "text",
        });
        const userId = localStorage.getItem("userId") ?? "";

        const res = await callAI({
          userId,
          action: "checklist",
          text: selected,
          promptExtra: "",
        });
        editor.selection.setContent(res);

        removeFloatingBadge();
      };
    }

    const aiRewriteBtn = document.getElementById("ai-rewrite");

    if (aiRewriteBtn) {
      aiRewriteBtn.onclick = async () => {
        const selected = editor.selection.getContent({
          format: "text",
        });
        const userId = localStorage.getItem("userId") ?? "";

        const res = await callAI({
          userId,
          action: "rewrite",
          text: selected,
          promptExtra: "",
        });
        editor.selection.setContent(res);

        removeFloatingBadge();
      };
    }
  }

  function removeFloatingBadge() {
    const b = document.getElementById("ai-floating-badge");
    if (b) b.remove();
  }

  // 3) Slash command: listen for "/" and parse command
  editor.on("keydown", function (e: any) {
    if (e.key === "/") {
      setTimeout(async () => {
        const command = prompt(
          "Slash command (summarize | improve | expand | checklist):"
        );

        if (command) {
          if (command.startsWith("summarize")) {
            const selected =
              editor.selection.getContent({ format: "text" }) ||
              editor.getContent({ format: "text" });

            const userId = localStorage.getItem("userId") ?? "";

            const [callAI] = useCallAIMutation();
            const { data } = await callAI({
              userId,
              action: "summarize",
              text: selected,
            });

            // show preview modal then insert
            editor.insertContent(
              '<div class="ai-generated">' + data.output + "</div>"
            );
          } else if (command.startsWith("improve")) {
            const selected =
              editor.selection.getContent({ format: "text" }) ||
              editor.getContent({ format: "text" });

            const userId = localStorage.getItem("userId") ?? "";

            const [callAI] = useCallAIMutation();
            const { data } = await callAI({
              userId,
              action: "improve",
              text: selected,
            });

            // show preview modal then insert
            editor.insertContent(
              '<div class="ai-generated">' + data.output + "</div>"
            );
          } else if (command.startsWith("expand")) {
            const selected =
              editor.selection.getContent({ format: "text" }) ||
              editor.getContent({ format: "text" });

            const userId = localStorage.getItem("userId") ?? "";

            const [callAI] = useCallAIMutation();
            const { data } = await callAI({
              userId,
              action: "expand",
              text: selected,
            });

            // show preview modal then insert
            editor.insertContent(
              '<div class="ai-generated">' + data.output + "</div>"
            );
          } else if (command.startsWith("checklist")) {
            const selected =
              editor.selection.getContent({ format: "text" }) ||
              editor.getContent({ format: "text" });

            const userId = localStorage.getItem("userId") ?? "";

            const [callAI] = useCallAIMutation();
            const { data } = await callAI({
              userId,
              action: "checklist",
              text: selected,
            });

            // show preview modal then insert
            editor.insertContent(
              '<div class="ai-generated">' + data.output + "</div>"
            );
          } else if (command.startsWith("rewrite")) {
            const selected =
              editor.selection.getContent({ format: "text" }) ||
              editor.getContent({ format: "text" });

            const userId = localStorage.getItem("userId") ?? "";

            const [callAI] = useCallAIMutation();
            const { data } = await callAI({
              userId,
              action: "rewrite",
              text: selected,
            });

            // show preview modal then insert
            editor.insertContent(
              '<div class="ai-generated">' + data.output + "</div>"
            );
          }
        }
      }, 50);
    }
  });
};
