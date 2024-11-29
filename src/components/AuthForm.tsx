import { LogoSVG } from "@/lib/icons";
import googleLogo from "/images/google-logo.png"
import { AuthFormProp } from "@/lib/types";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({message: "Please provide a valid email address"}),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const AuthForm = ({ title, description, isLogin }: AuthFormProp) => {
  const [showPassord, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="max-w-[540px] w-full flex flex-col justify-center items-center bg-white border border-[#E0E4EA] rounded-[12px] p-[48px]">
      <LogoSVG />
      <h1 className="font-bold text-2xl tracking-[-0.5px] text-[#0E121B] mt-5 mb-2">
        {title}
      </h1>
      <p className="font-normal text-sm tracking-[-0.2px] text-[#525866]">
        {description}
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
                <FormLabel className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    className={`${
                      fieldState.error ? "border-[#FB3748]" : "border-[#CACFD8]"
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="relative">
                <FormLabel className="text-[#0E121B] font-medium text-sm tracking-[-0.2px] flex items-center justify-between">
                  Password{" "}
                  {isLogin && (
                  <Link
                    to="/forgot-password"
                    className="text-[#525866] font-normal text-xs underline"
                  >
                    Forgot
                  </Link>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type={showPassord ? "text" : "password"}
                    className={`${
                      fieldState.error ? "border-[#FB3748]" : "border-[#CACFD8]"
                    }`}
                    {...field}
                  />
                </FormControl>

                <EyeIcon
                  onClick={() => setShowPassword((prev) => !prev)}
                  color="#525866"
                  size={18}
                  className={`absolute top-[39px] right-4 cursor-pointer ${
                    !showPassord ? "block" : "hidden"
                  }`}
                />

                <EyeOffIcon
                  onClick={() => setShowPassword((prev) => !prev)}
                  color="#525866"
                  size={18}
                  className={`absolute top-[39px] right-4 cursor-pointer ${
                    showPassord ? "block" : "hidden"
                  }`}
                />

                {!isLogin && (
                    <FormDescription className="text-[#525866] flex items-center gap-1">
                    <InfoIcon color="#525866" size={16} /> <span>At least 8 characters</span>
                    </FormDescription>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-[#335CFF] rounded-lg flex items-center justify-center hover:bg-[#3255e2] mx-auto w-full my-6 py-3 px-4"
          >
            {isLogin ? "Login" : "Sign up"}
          </Button>
        </form>
      </Form>

      <div className="border-b-[1px] border-[#E0E4EA] my-5 w-full" />

      <p className="text-[#525866] font-normal text-sm tracking-[-0.2px] py-2">Or log in with:</p>

      <Button size="lg" className="w-full bg-transparent border border-[#CACFD8] rounded-[12px] text-[#0E121B] font-medium text-base tracking-[0.5px] my-3 hover:bg-transparent hover:border-[#0E121B] duration-500"><img src={googleLogo} alt="Google Logo" className="w-[24px] mr-1" /> Google</Button>

      <div className="border-b-[1px] border-[#E0E4EA] my-3 w-full" />

      {isLogin ? (
        <small className="text-[#525866] font-normal text-sm tracking-[-0.2px] pt-3">No account yet? <Link to="/create" className="text-[#0E121B]">Sign Up</Link></small>
      ) : (
        <small className="text-[#525866] font-normal text-sm tracking-[-0.2px] pt-3">Already have an account? <Link to="/login" className="text-[#0E121B]">Login</Link></small>
      )}
    </section>
  );
};

export default AuthForm;
