import { IconArrowLeft } from "@/lib/icons"
import { Button } from "../components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react"
import { useState } from "react"
 
const formSchema = z.object({
  oldPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmNewPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

const ChangePasswordSettingsPage = () => {
    const [showPassord, setShowPassword] = useState({
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
      })
     
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }

  return (
    <section className={`${
        location.pathname === "/" ? "hidden lg:block" : location.pathname === "/settings" ? "hidden lg:block" : "block"
      }`}>
        <Link to="/settings" className="flex lg:hidden items-center gap-1 pt-3"><IconArrowLeft /> <span>Settings</span></Link>

        <h2 className="text-[#0E121B] pt-5 lg:pt-0 font-bold lg:font-semibold text-2xl lg:text-base  tracking-[-0.5px] lg:tracking-[-0.3px]">Change Password</h2>

        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field, fieldState }) => (
            <FormItem className="relative">
              <FormLabel className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">Old Password</FormLabel>
              <FormControl>
                <Input type={showPassord.oldPassword ? "text" : "password"} className={`${fieldState.error ? "border-[#FB3748]" : "border-[#CACFD8]"}`} {...field} />
              </FormControl>

              <EyeIcon onClick={() => setShowPassword((prev) => ({...prev, oldPassword: !prev.oldPassword}))} color="#525866" size={18} className={`absolute top-[39px] right-4 cursor-pointer ${!showPassord.oldPassword ? "block" : "hidden"}`} />
              
                <EyeOffIcon onClick={() => setShowPassword((prev) => ({...prev, oldPassword: !prev.oldPassword}))} color="#525866" size={18} className={`absolute top-[39px] right-4 cursor-pointer ${showPassord.oldPassword ? "block" : "hidden"}`} />

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <FormItem className="relative">
              <FormLabel className="text-[#0E121B] font-medium text-sm tracking-[-0.2px]">New Password</FormLabel>
              <FormControl>
                <Input type={showPassord.newPassword ? "text" : "password"} className={`${fieldState.error ? "border-[#FB3748]" : "border-[#CACFD8]"}`} {...field} />
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
        <Button type="submit" className="bg-[#335CFF] rounded-lg flex items-center justify-center hover:bg-[#3255e2] ml-auto my-6 py-3 px-4">Apply Changes</Button>
      </form>
    </Form>
    </section>
  )
}

export default ChangePasswordSettingsPage