import { editorPlugin, toolBar } from "@/lib/constants";
import { Editor } from "@tinymce/tinymce-react";
// Core TinyMCE
import "tinymce/tinymce";

// Theme
import "tinymce/themes/silver/theme";

// Icons
import "tinymce/icons/default";

// Content model (needed for v6)
import "tinymce/models/dom/model";

// Skins (UI styling)
import "tinymce/skins/ui/oxide/skin.min.css";

// Content CSS (for inside the editor iframe)
import "tinymce/skins/content/default/content.min.css";
import "tinymce/skins/content/default/content.css";

// Plugins you use
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
// add/remove as needed

interface Props {
  height?: number;
  noteContent: string;
  setNoteContent: (noteContent: string) => void;
}

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
        skin: false, // disable CDN skin loading
        content_css: false, // disable CDN content CSS
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
