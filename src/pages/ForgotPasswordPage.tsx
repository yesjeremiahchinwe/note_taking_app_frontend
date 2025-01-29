import { LogoSVG } from "@/lib/icons";
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
import useTitle from "@/hooks/useTitle";
import { useForgotPasswordMutation } from "@/store/auth/authApiSlice";
import { toast } from "@/hooks/use-toast";
import { Theme } from "@/providers/theme-provider";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address" }),
});

const ForgotPasswordPage = () => {
  useTitle("Forgot Password");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [forgotPassword, { isLoading, isSuccess, isError, error }] = useForgotPasswordMutation();
  const [theme] = useState<Theme>(
          () => (localStorage.getItem('notes-theme') as Theme) || 'system'
        )
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Sent successfully!",
        description: 'A password reset link has been sent to your email'
      });
    }

    if (isError) {
      toast({
        title: "Oops! Something went wrong!",
        //@ts-ignore
        description: `${error.data?.message || error?.message || "Try again please!"}`,
      });
    }
  }, [isSuccess, isError])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await forgotPassword({ email: values.email });
    } catch (err: any) {
      toast({
        title: `Oops! ${err?.message || err?.data?.message}`,
      });
    }
  };

  return (
    <main className="bg-lightGray dark:bg-tagsBg flex justify-center items-center min-h-screen w-full px-4">
      <section className="max-w-[540px] w-full flex flex-col justify-center items-center bg-background border border-lightGray rounded-[12px] max-sm:px-4 p-[48px]">
        <LogoSVG
          color={(theme === "system" || theme === "dark") ? "#FFF" : "#0E121B"}
        />
        <h1 className="font-bold text-2xl text-center tracking-[-0.5px] text-primaryText mt-5 mb-2">
          Forgotten your password?
        </h1>
        <p className="font-normal text-sm text-center tracking-[-0.2px] text-lighterGray">
          Enter your email below, and we&apos;ll send you a link to reset it.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-[2rem] w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-primaryText font-medium text-sm tracking-[-0.2px]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className={`${
                        fieldState.error && "border-lightRed"
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-lightRed" />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-[#335CFF] text-white rounded-lg flex items-center justify-center hover:bg-[#3255e2] mx-auto w-full my-6 py-3 px-4"
            >
              {isLoading ? "Loading..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
};
export default ForgotPasswordPage;
