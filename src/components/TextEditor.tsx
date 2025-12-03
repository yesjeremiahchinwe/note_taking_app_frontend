import { editorPlugin, toolBar } from "@/lib/constants";
import { Editor } from "@tinymce/tinymce-react";

interface Props {
  height?: number;
  noteContent: string;
  setNoteContent: (noteContent: string) => void;
}

// const aiText = await callAI({ action: "summarize", text: selectedText })
// editor.insertContent(aiText)

// improve, summarize, expand, rewrite, checklist

const TextEditor = ({ noteContent, setNoteContent, height = 400 }: Props) => {
  return (
    <Editor
      apiKey={import.meta.env.VITE_REACT_APP_TINYMCE_TEXT_EDITOR_API_KEY}
      onInit={(_evt, editor) => {
        setNoteContent(editor.getContent());
      }}
      value={noteContent}
      onEditorChange={(newValue) => {
        setNoteContent(newValue);
      }}
      init={{
        branding: false,
        height,
        menubar: "file edit view insert format tools table help",
        paste_data_images: true,
        powerpaste_word_import: "clean",
        powerpaste_html_import: "clean",
        plugins: editorPlugin,
        toolbar: toolBar,
      }}
    />
  );
};

/*  const [font] = useState<Font>(
      () => (localStorage.getItem("notes-font") as Font) || "sans-serif"
    ); */
{
  /* <Editor
                apiKey={
                  import.meta.env.VITE_REACT_APP_TINYMCE_TEXT_EDITOR_API_KEY
                }
                onInit={(_evt, editor) => {
                  setNoteContent(editor.getContent());
                }}
                value={noteContent}
                onEditorChange={(newValue) => {
                  setNoteContent(newValue);
                }}
                init={{
                  height: 280,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style: `body { font-family:${font}; font-size:14px; }`,
                }}
              /> */
}

export default TextEditor;
