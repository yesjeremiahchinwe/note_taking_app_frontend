import { LogoSVG } from "@/lib/icons";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import useTitle from "@/hooks/useTitle";

const formSchema = z.object({
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmNewPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const ResetPasswordPage = () => {
  useTitle("Reset Password")
  
    const [showPassord, setShowPassword] = useState({
        newPassword: false,
        confirmNewPassword: false
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: ""
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

    return (
    <main className="bg-[#F3F5F8] flex justify-center items-center min-h-screen w-full px-4">

<section className="max-w-[540px] w-full flex flex-col justify-center items-center bg-white border border-[#E0E4EA] rounded-[12px] p-[48px]">
      <LogoSVG />
      <h1 className="font-bold text-2xl tracking-[-0.5px] text-[#0E121B] mt-5 mb-2">Reset Your Password
      </h1>
      <p className="font-normal text-sm tracking-[-0.2px] text-[#525866]">
      Choose a new password to secure your account.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 mt-[2rem] w-full"
        >
          <FormField
          control={form.control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <FormItem className="relative">
              <FormLabel className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">New Password</FormLabel>
              <FormControl>
                <Input type={showPassord.newPassword ? "text" : "password"} 
                className={`${fieldState.error ? "border-[#FB3748]" : "border-[#CACFD8]"}`} {...field} />
              </FormControl>

                <EyeIcon onClick={() => setShowPassword((prev) => ({...prev, newPassword: !prev.newPassword}))} color="#525866" size={18} className={`absolute top-[39px] right-4 cursor-pointer ${!showPassord.newPassword ? "block" : "hidden"}`} />
              
                <EyeOffIcon onClick={() => setShowPassword((prev) => ({...prev, newPassword: !prev.newPassword}))} color="#525866" size={18} className={`absolute top-[39px] right-4 cursor-pointer ${showPassord.newPassword ? "block" : "hidden"}`} />

              <FormDescription className="text-[#525866] flex items-center gap-1">
              <InfoIcon color="#525866" size={16} /> <span>At least 8 characters</span>
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field, fieldState }) => (
            <FormItem className="relative">
              <FormLabel className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">Confirm New Password</FormLabel>
              <FormControl>
                <Input type={showPassord.confirmNewPassword ? "text" : "password"} className={`${fieldState.error ? "border-[#FB3748]" : "border-[#CACFD8]"}`} {...field} />
              </FormControl>

              <EyeIcon onClick={() => setShowPassword((prev) => ({...prev, confirmNewPassword: !prev.confirmNewPassword}))} color="#525866" size={18} className={`absolute top-[39px] right-4 cursor-pointer ${!showPassord.confirmNewPassword ? "block" : "hidden"}`} />
              
                <EyeOffIcon onClick={() => setShowPassword((prev) => ({...prev, confirmNewPassword: !prev.confirmNewPassword}))} color="#525866" size={18} className={`absolute top-[39px] right-4 cursor-pointer ${showPassord.confirmNewPassword ? "block" : "hidden"}`} />

              <FormMessage />
            </FormItem>
          )}
        />
          <Button
            type="submit"
            className="bg-[#335CFF] rounded-lg flex items-center justify-center hover:bg-[#3255e2] mx-auto w-full my-6 py-3 px-4"
          >
            Reset Password
          </Button>
        </form>
      </Form>
      </section>
        
    </main>
)
}
export default ResetPasswordPage