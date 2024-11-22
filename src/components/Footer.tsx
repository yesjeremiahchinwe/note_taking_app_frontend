import {
  IconArchive,
  IconHome,
  IconSearch,
  IconSettings,
  IconTag,
} from "@/lib/icons";

const Footer = () => {
  return (
    <footer className="block fixed bottom-0 z-10 bg-white h-[85px] lg:hidden w-full px-[2rem]">
      <nav className="pt-4">
        <ul className="flex items-center gap-1 justify-between w-full flex-grow">
          <li>
            <a href="/" className="flex flex-col items-center justify-center gap-1 flex-grow">
              <IconHome />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/" className="flex flex-col items-center gap-1 flex-grow">
              <IconSearch />
              <span>Search</span>
            </a>
          </li>
          <li>
            <a href="/" className="flex flex-col items-center gap-1 flex-grow">
              <IconArchive />
              <span>Archived</span>
            </a>
          </li>
          <li>
            <a href="/" className="flex flex-col items-center gap-1 flex-grow">
              <IconTag />
              <span>Tags</span>
            </a>
          </li>
          <li>
            <a href="/" className="flex flex-col items-center gap-1 flex-grow">
              <IconSettings />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
