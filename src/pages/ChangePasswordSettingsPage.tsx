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
import useTitle from "@/hooks/useTitle";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeftIcon, EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdateUserPasswordMutation } from "@/store/users/usersApiSlice";
import { toast } from "react-toastify";
import { changePasswordFormValidationSchema } from "@/lib/formValidations";

const ChangePasswordSettingsPage = () => {
  useTitle("Change Pasword");

  const [showPassord, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [errMsg, setErrMsg] = useState("");
  const [updateUserPassword, { isLoading, isSuccess, isError, error }] =
    useUpdateUserPasswordMutation();

  const form = useForm<z.infer<typeof changePasswordFormValidationSchema>>({
    resolver: zodResolver(changePasswordFormValidationSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      //@ts-ignore
      setErrMsg(error.data?.message || error?.message);
      //@ts-ignore
      toast.error(`Oops! ${error?.data?.message}`);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully!");
      navigate("/settings");
    }
  }, [isSuccess]);

  const onSubmit = async (
    values: z.infer<typeof changePasswordFormValidationSchema>
  ) => {
    try {
      await updateUserPassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <section
      className={`mt-16 lg:mt-0 ${
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
        Change Password
      </h2>

      <p className="text-lightRed block">{errMsg}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field, fieldState }) => (
              <FormItem className="relative">
                <FormLabel className="text-primaryText font-medium text-sm tracking-[-0.2px]">
                  Old Password
                </FormLabel>
                <FormControl>
                  <Input
                    type={showPassord.oldPassword ? "text" : "password"}
                    className={`${fieldState.error && "border-lightRed"}`}
                    {...field}
                  />
                </FormControl>

                <EyeIcon
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      oldPassword: !prev.oldPassword,
                    }))
                  }
                  color="currentColor"
                  size={18}
                  className={`absolute top-[37px] right-4 cursor-pointer ${
                    !showPassord.oldPassword ? "block" : "hidden"
                  }`}
                />

                <EyeOffIcon
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      oldPassword: !prev.oldPassword,
                    }))
                  }
                  color="currentColor"
                  size={18}
                  className={`absolute top-[37px] right-4 cursor-pointer ${
                    showPassord.oldPassword ? "block" : "hidden"
                  }`}
                />

                <FormMessage className="text-lightRed" />
              </FormItem>
            )}
          />
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
                  className={`absolute top-[37px] right-4 cursor-pointer ${
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
                  className={`absolute top-[37px] right-4 cursor-pointer ${
                    showPassord.newPassword ? "block" : "hidden"
                  }`}
                />

                <FormDescription className="text flex items-center gap-1">
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
                    type={showPassord.confirmNewPassword ? "text" : "password"}
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
                  className={`absolute top-[37px] right-4 cursor-pointer ${
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
                  className={`absolute top-[37px] right-4 cursor-pointer ${
                    showPassord.confirmNewPassword ? "block" : "hidden"
                  }`}
                />

                <FormMessage className="text-lightRed" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-skyBlue text-white rounded-lg flex items-center justify-center hover:bg-[#3255e2] ml-auto my-6 py-3 px-4"
          >
            {isLoading ? "Saving..." : "Apply Changes"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ChangePasswordSettingsPage;
