import { editorPlugin, toolBar } from "@/lib/constants";
import { aiSetupFunction } from "@/lib/helpers";
import { Editor } from "@tinymce/tinymce-react";

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
        branding: false,
        height,
        menubar: "file edit view insert format tools table help",
        paste_data_images: true,
        powerpaste_word_import: "clean",
        powerpaste_html_import: "clean",
        plugins: editorPlugin,
        toolbar: toolBar,
        setup: aiSetupFunction,

        placeholder: "Start writing your note here and select or highlight text to see AI options…",
      }}
    />
  );
};

export default TextEditor;
