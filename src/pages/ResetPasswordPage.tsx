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
import { useResetPasswordMutation } from "@/store/auth/authApiSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordFormValidationSchema } from "@/lib/formValidations";

const ResetPasswordPage = () => {
  useTitle("Reset Password");

  const [showPassord, setShowPassword] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });
  const { userId } = useParams();

  const form = useForm<z.infer<typeof resetPasswordFormValidationSchema>>({
    resolver: zodResolver(resetPasswordFormValidationSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (
    values: z.infer<typeof resetPasswordFormValidationSchema>
  ) => {
    try {
      await resetPassword({
        userId,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });
      toast(`You've successfully reset your password.`);
    } catch (err: any) {
      toast(`Oops! ${err?.message || err?.data?.message}`);
    }
  };

  return (
    <main className="bg-lightGray dark:bg-tagsBg flex justify-center items-center min-h-screen w-full px-4">
      <section className="max-w-[540px] w-full flex flex-col justify-center items-center bg-background border border-lightGray rounded-[12px] max-sm:px-4 p-[48px]">
        <LogoSVG color="currentColor" />
        <h1 className="font-bold text-2xl text-center tracking-[-0.5px] text-primaryText mt-5 mb-2">
          Reset Your Password
        </h1>
        <p className="font-normal text-sm text-center tracking-[-0.2px] text-lighterGray dark:text-[#99A0AE]">
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
                  <FormLabel className="text-primaryText font-medium text-sm tracking-[-0.2px]">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassord.newPassword ? "text" : "password"}
                      className={`${fieldState.error && "border-lightRed"}`}
                      {...field}
                    />
                  </FormControl>

                  <EyeIcon
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        newPassword: !prev.newPassword,
                      }))
                    }
                    color="currentColor"
                    size={18}
                    className={`absolute top-[39px] right-4 cursor-pointer ${
                      !showPassord.newPassword ? "block" : "hidden"
                    }`}
                  />

                  <EyeOffIcon
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        newPassword: !prev.newPassword,
                      }))
                    }
                    color="currentColor"
                    size={18}
                    className={`absolute top-[39px] right-4 cursor-pointer ${
                      showPassord.newPassword ? "block" : "hidden"
                    }`}
                  />

                  <FormDescription className="text-lighterGray dark:text-[#99A0AE] flex items-center gap-1">
                    <InfoIcon color="currentColor" size={16} />{" "}
                    <span>At least 8 characters</span>
                  </FormDescription>

                  <FormMessage className="text-lightRed" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field, fieldState }) => (
                <FormItem className="relative">
                  <FormLabel className="text-primaryText font-medium text-sm tracking-[-0.2px]">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={
                        showPassord.confirmNewPassword ? "text" : "password"
                      }
                      className={`${fieldState.error && "border-lightRed"}`}
                      {...field}
                    />
                  </FormControl>

                  <EyeIcon
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirmNewPassword: !prev.confirmNewPassword,
                      }))
                    }
                    color="currentColor"
                    size={18}
                    className={`absolute top-[39px] right-4 cursor-pointer ${
                      !showPassord.confirmNewPassword ? "block" : "hidden"
                    }`}
                  />

                  <EyeOffIcon
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirmNewPassword: !prev.confirmNewPassword,
                      }))
                    }
                    color="currentColor"
                    size={18}
                    className={`absolute top-[39px] right-4 cursor-pointer ${
                      showPassord.confirmNewPassword ? "block" : "hidden"
                    }`}
                  />

                  <FormMessage className="text-lightRed" />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-[#335CFF] text-white rounded-lg flex items-center justify-center hover:bg-[#3255e2] mx-auto w-full my-6 py-3 px-4"
            >
              {isLoading ? "Loading..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
};
export default ResetPasswordPage;
