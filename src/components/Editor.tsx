import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Font } from '@/providers/font-provider';

const TinyMCEEditor = ({ content, setNoteContent }: { content: string, setNoteContent: (content: string) => void }) => {
  const editorRef = useRef<HTMLInputElement>(null)
  const [font] = useState<Font>(
      () => (localStorage.getItem('notes-font') as Font) || 'sans-serif'
    )

  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_REACT_APP_TINYMCE_TEXT_EDITOR_API_KEY}
        //@ts-ignore
        onInit={(_evt, editor) => editorRef.current = editor}
        value={content}
        tagName='input'
        onChange={(e) => setNoteContent(e.target.value)}
        init={{
          height: 260,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: `body { font-family:${font}; font-size:14px; }`
        }}
      />
    </>
  );
}

export default TinyMCEEditor