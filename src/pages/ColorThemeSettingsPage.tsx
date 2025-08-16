import { IconMoon, IconSun, IconSystemTheme } from "@/lib/icons";
import useTitle from "@/hooks/useTitle";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
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
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";

const FormSchema = z.object({
  theme: z.enum(["dark", "light", "system"], {
    required_error: "You need to select a theme.",
  }),
});

const ColorThemeSettingsPage = () => {
  useTitle("Choose Color Theme");
  const { theme, setTheme } = useTheme();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: `You switched to ${data.theme} theme`,
    });

    setTheme(data.theme);
  };

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
        Color Theme
      </h2>
      <p className="text-sm text-lighterGray font-normal tracking-[-0.2px] pt-1 lg:pt-0 pb-3 lg:pb-0">
        Choose your color theme:
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-4 lg:mt-0"
        >
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="system"
                    className="flex flex-col gap-4 mt-6 lg:mt-[2rem]"
                  >
                    <FormItem>
                      <FormLabel
                        htmlFor="light-mode"
                        className={cn(
                          "cursor-pointer border-[1px] border-grayBorder rounded-xl px-5 py-4 flex items-center justify-between gap-4 w-full flex-1",
                          theme === "light" || field.value === "light"
                            ? "bg-lightGray"
                            : "bg-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-[40px] h-[40px] rounded-[12px] bg-grayBorder border-[1px] border-grayBorder flex items-center justify-center">
                            <IconSun color="currentColor" />
                          </div>

                          <div>
                            <h5 className="text-primaryText m-0 text-sm font-medium tracking-[-0.2px]">
                              Light Mode
                            </h5>
                            <small className="text-lighterGray text-sm tracking-[-0.2px]">
                              Pick a clean and classic light theme
                            </small>
                          </div>
                        </div>

                        <FormControl>
                          <RadioGroupItem
                            className={cn(
                              theme === "light" || field.value === "light"
                                ? "border-[4.5px] border-[#335CFF]"
                                : "border-[#9a9da1]"
                            )}
                            id="light-mode"
                            value="light"
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>

                    <FormItem>
                      <FormLabel
                        htmlFor="dark-mode"
                        className={cn(
                          "cursor-pointer border-[1px] border-grayBorder rounded-xl px-5 py-4 flex items-center justify-between gap-4 w-full flex-1",
                          theme === "dark" || field.value === "dark"
                            ? "bg-lightGray"
                            : "bg-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-[40px] h-[40px] rounded-[12px] bg-grayBorder border-[1px] border-grayBorder flex items-center justify-center">
                            <IconMoon color="currentColor" />
                          </div>

                          <div>
                            <h5 className="text-primaryText m-0 text-sm font-medium tracking-[-0.2px]">
                              Dark Mode
                            </h5>
                            <small className="text-lighterGray text-sm tracking-[-0.2px]">
                              Select a sleek and modern dark theme
                            </small>
                          </div>
                        </div>

                        <FormControl>
                          <RadioGroupItem
                            className={cn(
                              theme === "dark" || field.value === "dark"
                                ? "border-[4.5px] border-[#335CFF]"
                                : "border-[#9a9da1]"
                            )}
                            id="dark-mode"
                            value="dark"
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>

                    <FormItem>
                      <FormLabel
                        htmlFor="system-mode"
                        className={cn(
                          "cursor-pointer border-[1px] border-grayBorder rounded-xl px-5 py-4 flex items-center justify-between gap-4 w-full flex-1",
                          theme === "system" || field.value === "system"
                            ? "bg-lightGray"
                            : "bg-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-[40px] h-[40px] rounded-[12px] bg-grayBorder border-[1px] border-grayBorder flex items-center justify-center">
                            <IconSystemTheme color="currentColor" />
                          </div>

                          <div>
                            <h5 className="text-primaryText m-0 text-sm font-medium tracking-[-0.2px]">
                              System
                            </h5>
                            <small className="text-lighterGray text-sm tracking-[-0.2px]">
                              Adapts to your device&apos;s theme
                            </small>
                          </div>
                        </div>

                        <FormControl>
                          <RadioGroupItem
                            className={cn(
                              theme === "system" || field.value === "system"
                                ? "border-[4.5px] border-skyBlue"
                                : "border-[#9a9da1]"
                            )}
                            id="system-mode"
                            value="system"
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

export default ColorThemeSettingsPage;
