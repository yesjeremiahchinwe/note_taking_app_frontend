import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IconClock, IconStatus, IconTag } from "@/lib/icons";
import { Note } from "@/lib/types";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import deleteIcon from "/images/icon-delete.svg";
import archivedIcon from "/images/icon-archive.svg";
import chevronLeftIcon from "/images/icon-arrow-left.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteModal from "@/components/modals/DeleteNoteModal";
import ArchiveNoteModal from "@/components/modals/ArchiveNoteModal";
import useTitle from "@/hooks/useTitle";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Note title must be at least 2 characters long" }),
  tags: z
    .string()
    .min(2, { message: "A tag must be at least 2 characters long" }),
  content: z
    .string()
    .min(2, { message: "Content must be at least 2 characters long" }),
});

const NoteDetails = ({ notes }: { notes: Note[] }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState({
    archiveNote: false,
    deleteNote: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const { title } = useParams();
  const noteQueryParam = searchParams.get("note");
  const tagQueryParam = searchParams.get("tag");

  let note = title
    ? (notes.find(
        (note) => note.title.toLowerCase().split(" ").join("-") === title
      ) as Note)
    : noteQueryParam
    ? (notes.find(
        (note) =>
          note.title.toLowerCase().split(" ").join("-") === noteQueryParam
      ) as Note)
    : tagQueryParam
    ? notes.filter(note => note.tags.includes(tagQueryParam as string))[0] 
    : notes[0];

  useTitle(note.title);

  useEffect(() => {
    if (noteQueryParam) {
      note = notes.find(
        (note) =>
          note.title.toLowerCase().split(" ").join("-") === noteQueryParam
      ) as Note;
    }
  }, [note]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note.title ?? "",
      tags: note.tags.join(", ") ?? "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const goBackToPreviousPage = location.pathname.includes("archived")
    ? "/archived"
    : "/";

  return (
    <>
      {/* ------------ Note Details Header --------------- */}
      <div className="flex lg:hidden items-center justify-between w-full py-2">
        <Link
          to={goBackToPreviousPage}
          className="flex items-center gap-1 pl-[14px] text-black"
        >
          <img src={chevronLeftIcon} alt="Chevron Left Icon" />
          <span className="text-[#525866] font-normal tracking-[-0.2px] text-sm">
            Go Back
          </span>
        </Link>

        <div className="flex items-center">
          <Button
            size="icon"
            className="bg-transparent hover:bg-transparent shadow-none border-none mr-2"
            onClick={() =>
              setIsOpen((prev) => ({ ...prev, deleteNote: !prev.deleteNote }))
            }
          >
            <img src={deleteIcon} alt="A delete Icon" />
          </Button>

          <Button
            size="icon"
            className="bg-transparent hover:bg-transparent shadow-none border-none"
            onClick={() =>
              setIsOpen((prev) => ({ ...prev, archiveNote: !prev.archiveNote }))
            }
          >
            <img src={archivedIcon} alt="Archive Icon" />
          </Button>

          <Button className="bg-transparent mr-[-0.4rem] hover:bg-transparent shadow-none border-none text-black">
            Cancel
          </Button>

          <Button className="bg-transparent hover:bg-transparent shadow-none border-none text-[#335CFF]">
            Save Note
          </Button>
        </div>
      </div>

      {/* -------------- Note Body ------------------ */}
      <section
        className={`${
          location.pathname === "/"
            ? "hidden lg:block"
            : location.pathname === "/archived"
            ? "hidden lg:block"
            : "block"
        } pt-4 mx-[20px] lg:px-0 lg:mx-0 lg:pt-0 border-t-[1px] border-[#E0E4EA] lg:border-t-0`}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-[#0E121B] font-medium text-sm tracking-[-0.2px] sr-only">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className={`h-[50px] md:text-[1.75rem] font-bold text-[#0E121B] tracking-[-0.5px] ${
                        fieldState.error
                          ? "border-[#FB3748]"
                          : "border-transparent shadow-none"
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <article className="w-full flex items-center gap-[3rem] pb-5 mb-2 border-b-[1px] border-[#E0E4EA] px-4 pt-3">
              <div className="flex flex-col gap-[2rem]">
                <p className="flex items-center gap-2">
                  <IconTag color="#0E121B" />{" "}
                  <span className="text-[#2B303B] font-normal text-sm tracking-[-0.2px]">
                    Tags
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <IconStatus color="#0E121B" />{" "}
                  <span className="text-[#2B303B] font-normal text-sm pt-1 tracking-[-0.2px]">
                    Status
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <IconClock />{" "}
                  <span className="text-[#2B303B] font-normal text-sm tracking-[-0.2px]">
                    Last edited
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-[2.25rem]">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-[#0E121B] font-medium text-sm tracking-[-0.2px] sr-only">
                        Tags
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className={`h-9 pt-1 pb-2 ${
                            fieldState.error
                              ? "border-[#FB3748]"
                              : "border-transparent shadow-none"
                          } text-[#2B303B] font-normal text-sm tracking-[-0.2px]`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="text-[#2B303B] font-normal text-sm tracking-[-0.2px]">
                  Archived
                </p>

                <p className="text-[#2B303B] font-normal text-sm tracking-[-0.2px]">
                  {note?.lastEdited.split("T")[0]}
                </p>
              </div>
            </article>

            <FormField
              control={form.control}
              name="content"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-[#0E121B] font-medium text-sm tracking-[-0.2px] sr-only">
                    Note Content
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className={`${
                        fieldState.error
                          ? "border-[#FB3748]"
                          : "border-[#CACFD8]"
                      } text-[#2B303B] font-normal text-sm tracking-[-0.2px]`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3 border-t-[1px] border-[#E0E4EA] py-4">
              <Button className="bg-[#335CFF] hover:bg-[#3357e9] shadow-none border-none">
                Save Note
              </Button>
              <Button className="bg-[#F3F5F8] hover:bg-[#e0e1e4] text-[#2B303B] shadow-none border-none">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </section>

      <DeleteModal
        isOpen={isOpen.deleteNote}
        onClose={() => setIsOpen((prev) => ({ ...prev, deleteNote: false }))}
        onConfirm={() => setIsOpen((prev) => ({ ...prev, deleteNote: false }))}
        loading={false}
      />

      <ArchiveNoteModal
        isOpen={isOpen.archiveNote}
        onClose={() => setIsOpen((prev) => ({ ...prev, archiveNote: false }))}
        onConfirm={() => setIsOpen((prev) => ({ ...prev, archiveNote: false }))}
        loading={false}
      />
    </>
  );
};

export default NoteDetails;
