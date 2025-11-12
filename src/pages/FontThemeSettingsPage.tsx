import {
  IconFontMonospace,
  IconFontSansSerif,
  IconFontSerif,
} from "@/lib/icons";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import useTitle from "@/hooks/useTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useFont } from "@/providers/font-provider";
import { ChevronLeftIcon } from "lucide-react";
import { changeFontThemeFormValidationSchema } from "@/lib/formValidations";

const FontThemeSettingsPage = () => {
  useTitle("Choose Font Theme");

  const { font, setFont } = useFont();
  const form = useForm<z.infer<typeof changeFontThemeFormValidationSchema>>({
    resolver: zodResolver(changeFontThemeFormValidationSchema),
  });

  function onSubmit(data: z.infer<typeof changeFontThemeFormValidationSchema>) {
    setFont(data.font);
    toast({
      title: `You switched to ${data.font} font theme`,
    });
  }

  return (
    <section
      className={`${
        location.pathname === "/"
          ? "hidden lg:block"
          : location.pathname === "/settings"
          ? "hidden lg:block"
          : "block"
      }`}
    >
      <Link
        to="/settings"
        className="flex lg:hidden items-center gap-1 pt-3 ml-[-0.5rem]"
      >
        <ChevronLeftIcon color="currentColor" /> <span>Settings</span>
      </Link>

      <h2 className="text-primaryText pt-5 lg:pt-0 font-bold lg:font-semibold text-2xl lg:text-base  tracking-[-0.5px] lg:tracking-[-0.3px]">
        Font Theme
      </h2>
      <p className="text-sm text-lighterGray font-normal tracking-[-0.2px] pt-2 lg:pt-0">
        Choose your font theme:
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-4 lg:mt-0"
        >
          <FormField
            control={form.control}
            name="font"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4 mt-6 lg:mt-[2rem]"
                  >
                    <FormItem>
                      <FormLabel
                        htmlFor="sans-serif-mode"
                        className={cn(
                          "cursor-pointer border-[1px] border-grayBorder rounded-xl px-5 py-4 flex items-center justify-between gap-4 w-full flex-1",
                          font === "sans-serif" || field.value === "sans-serif"
                            ? "bg-lightGray"
                            : "bg-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-[40px] h-[40px] rounded-[12px] bg-grayBorder border-[1px] border-grayBorder flex items-center justify-center">
                            <IconFontSansSerif color="currentColor" />
                          </div>

                          <div>
                            <h5 className="text-primaryText m-0 text-sm font-medium tracking-[-0.2px]">
                              Sans-serif
                            </h5>
                            <small className="text-lighterGray text-sm tracking-[-0.2px]">
                              Clean and modern, easy to read
                            </small>
                          </div>
                        </div>

                        <FormControl>
                          <RadioGroupItem
                            className={cn(
                              font === "sans-serif" ||
                                field.value === "sans-serif"
                                ? "border-[4.5px] border-skyBlue"
                                : "border-[#9a9da1]"
                            )}
                            id="sans-serif-mode"
                            value="sans-serif"
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>

                    <FormItem>
                      <FormLabel
                        htmlFor="serif-mode"
                        className={cn(
                          "cursor-pointer border-[1px] border-grayBorder rounded-xl px-5 py-4 flex items-center justify-between gap-4 w-full flex-1",
                          font === "serif" || field.value === "serif"
                            ? "bg-lightGray"
                            : "bg-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-[40px] h-[40px] rounded-[12px] bg-grayBorder border-[1px] border-grayBorder flex items-center justify-center">
                            <IconFontSerif color="currentColor" />
                          </div>

                          <div>
                            <h5 className="text-primaryText m-0 text-sm font-medium tracking-[-0.2px]">
                              Serif
                            </h5>
                            <small className="text-lighterGray text-sm tracking-[-0.2px]">
                              Classic and elegant for a timeless feel.
                            </small>
                          </div>
                        </div>

                        <FormControl>
                          <RadioGroupItem
                            className={cn(
                              font === "serif" || field.value === "serif"
                                ? "border-[4.5px] border-skyBlue"
                                : "border-[#9a9da1]"
                            )}
                            id="serif-mode"
                            value="serif"
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>

                    <FormItem>
                      <FormLabel
                        htmlFor="monospace-mode"
                        className={cn(
                          "cursor-pointer border-[1px] border-grayBorder rounded-xl px-5 py-4 flex items-center justify-between gap-4 w-full flex-1",
                          font === "monospace" || field.value === "monospace"
                            ? "bg-lightGray"
                            : "bg-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-[40px] h-[40px] rounded-[12px] bg-grayBorder border-[1px] border-grayBorder flex items-center justify-center">
                            <IconFontMonospace color="currentColor" />
                          </div>

                          <div>
                            <h5 className="text-primaryText m-0 text-sm font-medium tracking-[-0.2px]">
                              Monospace
                            </h5>
                            <small className="text-lighterGray text-sm tracking-[-0.2px]">
                              Code-like, great for a technical vibe.
                            </small>
                          </div>
                        </div>

                        <FormControl>
                          <RadioGroupItem
                            className={cn(
                              font === "monospace" ||
                                field.value === "monospace"
                                ? "border-[4.5px] border-skyBlue"
                                : "border-[#9a9da1]"
                            )}
                            id="monospace-mode"
                            value="monospace"
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-skyBlue text-white rounded-lg flex items-center justify-center hover:bg-[#3255e2] ml-auto my-6 py-3 px-4">
            Apply Changes
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default FontThemeSettingsPage;
