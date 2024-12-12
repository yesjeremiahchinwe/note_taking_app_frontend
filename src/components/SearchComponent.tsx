import { IconSearch } from "@/lib/icons";
import { Input } from "./ui/input";
import { Theme } from "@/providers/theme-provider";
import { useState } from "react";
import AllNotes from "./AllNotes";

interface Props {
  searchQuery: string,
  setSearchQuery: (searchQuery: string) => void
}

const SearchComponent = ({ searchQuery, setSearchQuery }: Props) => {
  const [theme] = useState<Theme>(
        () => (localStorage.getItem('notes-theme') as Theme) || 'system'
      )

  return (
    <section className="block lg:hidden px-[1.85rem] pt-3 mt-3 pb-[6rem] min-h-screen">
         <div className="w-full relative">
            <IconSearch color={(theme === "system" || theme === "dark") ? "#717784" : "#0E121B"} className="absolute left-4 top-[0.8rem]" />
            <Input
              type="text"
              className="py-6 pl-[3rem] text-base pr-5"
              placeholder="Search by title, content, or tags"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="py-6">
            <AllNotes />
          </div>
    </section>
  )
}

export default SearchComponent