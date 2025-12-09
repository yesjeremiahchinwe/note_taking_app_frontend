import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Editor } from "tinymce";
import { toast } from "react-toastify";

interface OpenAIDrawerProps {
  open: boolean;
  onClose: () => void;
  editor: Editor;
}

const OpenAIDrawer = ({ open, onClose, editor }: OpenAIDrawerProps) => {
  const selectedText = editor?.selection?.getContent()?.trim() || "";

  const [action, setAction] = useState("improve");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const runAI = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/ai/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action,
            text: selectedText,
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text(); // may not be JSON
        const parseError = JSON.parse(errorText);
        setErrorMessage(parseError?.error || parseError?.data?.error);
        throw new Error(errorText || "AI request failed");
      }

      const data = await res.json();

      if (!data?.result) {
        throw new Error("AI returned empty response");
      }

      setOutput(data.result);
    } catch (err: any) {
      const parsedErr = JSON.parse(err?.message);
      setErrorMessage(
        parsedErr?.error || "Something went wrong while processing AI request."
      );
    } finally {
      setLoading(false);
    }
  };

  const insertIntoEditor = () => {
    try {
      if (!output?.trim()) {
        toast.error("Nothing to insert.");
        return;
      }

      editor.insertContent(output);
      onClose();
    } catch (err: any) {
      toast.error("Could not insert text into the editor.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[95%] sm:max-w-[480px] p-6 space-y-4">
        <SheetHeader>
          <SheetTitle>AI Assistant ✨</SheetTitle>
        </SheetHeader>

        {/* Selected Text Preview */}
        <div className="text-sm text-muted-foreground font-medium">
          Selected text:
        </div>

        <ScrollArea className="h-20 rounded border p-2 bg-muted text-sm">
          {selectedText ? selectedText : <p className="text-red-400">No text selected in editor. (Please select text from the editor to continue)</p>}
        </ScrollArea>

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap">
          {["improve", "summarize", "expand", "rewrite", "checklist"].map((a) => (
            <Button
              key={a}
              variant={action === a ? "default" : "outline"}
              onClick={() => setAction(a)}
              className="capitalize"
            >
              {a}
            </Button>
          ))}
        </div>

        {errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}

        {/* AI Output */}
        <div className="text-sm text-muted-foreground">
          <strong>AI Output:</strong>
        </div>

        <Textarea
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder="AI will generate content here..."
          className="min-h-[150px]"
        />

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button disabled={loading || !selectedText} onClick={runAI}>
            {loading ? "Thinking..." : "Run AI ✨"}
          </Button>

          <Button disabled={!output} onClick={insertIntoEditor}>
            Insert
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OpenAIDrawer;
