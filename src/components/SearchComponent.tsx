import { IconSearch } from "@/lib/icons";
import { Input } from "./ui/input";

interface Props {
  searchQuery: string,
  setSearchQuery: (searchQuery: string) => void
}

const SearchComponent = ({ searchQuery, setSearchQuery }: Props) => {
  return (
    <section className="block lg:hidden px-[1.85rem] pt-3 pb-[6rem] min-h-screen">
         <div className="w-full relative">
            <IconSearch color="#000" className="absolute left-4 top-4" />
            <Input
              type="text"
              className="py-6 pl-[3rem] text-base pr-5"
              placeholder="Search by title, content, or tags"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
    </section>
  )
}

export default SearchComponent