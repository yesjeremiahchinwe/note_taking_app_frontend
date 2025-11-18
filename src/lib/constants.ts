import { useLocation, useSearchParams } from "react-router-dom";
import { MobileNavLink } from "./types";
import {
  IconArchive,
  IconHome,
  IconSearch,
  IconSettings,
  IconTag,
} from "./icons";

export const MobileNavLinks = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const tagQueryParam = searchParams.get("tag");

  const mobileLinks: MobileNavLink[] = [
    {
      text: "Home",
      path: "/",
      isActive: location.pathname === "/" && tagQueryParam === null,
      Icon: IconHome,
    },
    {
      text: "Search",
      path: "/search",
      isActive: location.pathname === "/search",
      Icon: IconSearch,
    },
    {
      text: "Archived",
      path: "/archived",
      isActive: location.pathname.includes("/archived"),
      Icon: IconArchive,
    },
    {
      text: "Tags",
      path: "/tags",
      isActive: location.pathname === "/tags" || (location.pathname === "/" && tagQueryParam !== null),
      Icon: IconTag,
    },
    {
      text: "Settings",
      path: "/settings",
      isActive: location.pathname.includes("/settings"),
      Icon: IconSettings,
    },
  ];

  return mobileLinks;
};

export const editorPlugin = [
  "lists",
  "link",
  "image",
  "table",
  "code",
  "fullscreen",
  "paste",
  "searchreplace",
  "wordcount",
  "insertdatetime",
  "media",
  "autolink",
  "charmap",
  "preview",
  "emoticons",
];

export const toolBar =
  "undo redo | blocks fontfamily fontsize | forecolor backcolor permanentpen formatpainter |   bold italic underline strikethrough |   link image media table mergetags |   align lineheight | numlist bullist checklist |   emoticons charmap |   addcomment showcomments |   spellcheckdialog a11ycheck typography | codesample code | removeformat";
