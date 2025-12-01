import { LogoSVG } from "@/lib/icons";
import googleLogo from "/images/google-logo.png";
import { Button } from "../ui/button";
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
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAddNewUserMutation } from "@/store/auth/authApiSlice";
import { toast } from "react-toastify";
import { signUpFormValidationSchema } from "@/lib/formValidations";

const SignUpAuthForm = () => {
  const [showPassord, setShowPassword] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();

  const [
    addNewUser,
    {
      isLoading: isLoadingNewUser,
      isSuccess: isSuccessAddNewUser,
      isError: isErrorAddNewUser,
      error: errorAddNewUser,
    },
  ] = useAddNewUserMutation();

  const form = useForm<z.infer<typeof signUpFormValidationSchema>>({
    resolver: zodResolver(signUpFormValidationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccessAddNewUser) {
      toast.success("Account created successfully!");
      setErrMsg("");
      navigate("/login");
    }

    if (isErrorAddNewUser) {
      setErrMsg(
        //@ts-ignore
        errorAddNewUser.data?.message ||
          "Oops! Something went wrong! Please try again."
      );
    }
  }, [isSuccessAddNewUser, isErrorAddNewUser]);

  const onSubmit = async (
    values: z.infer<typeof signUpFormValidationSchema>
  ) => {
    try {
      await addNewUser({
        username: values.username,
        email: values.email,
        password: values.password,
      }).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <section className="max-w-[540px] w-full flex flex-col justify-center items-center bg-background border border-lightGray rounded-[12px] max-sm:px-4 p-[48px]">
      <LogoSVG color="currentColor" />

      <h1 className="font-bold text-2xl text-center tracking-[-0.5px] text-primaryText mt-5 mb-2">
        Create Your Account
      </h1>
      <p className="font-normal text-sm text-center tracking-[-0.2px] text-lighterGray">
        Sign up to start organizing your notes and boost your productivity.
      </p>

      {errMsg && <p className="text-lightRed pt-2">{errMsg}</p>}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 mt-[2rem] w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-primaryText font-medium text-sm tracking-[-0.2px]">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className={`${fieldState.error && "border-lightRed"}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-lightRed" />
              </FormItem>
            )}
          />

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
                    className={`${fieldState.error && "border-lightRed"}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-lightRed" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="relative">
                <FormLabel className="text-primaryText font-medium text-sm tracking-[-0.2px] flex items-center justify-between">
                  Password{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    type={showPassord ? "text" : "password"}
                    className={`${fieldState.error && "border-lightRed"}`}
                    {...field}
                  />
                </FormControl>

                <EyeIcon
                  onClick={() => setShowPassword((prev) => !prev)}
                  color="currentColor"
                  size={18}
                  className={`absolute top-[34px] right-4 cursor-pointer ${
                    !showPassord ? "block" : "hidden"
                  }`}
                />

                <EyeOffIcon
                  onClick={() => setShowPassword((prev) => !prev)}
                  color="currentColor"
                  size={18}
                  className={`absolute top-[34px] right-4 cursor-pointer ${
                    showPassord ? "block" : "hidden"
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
          <Button
            type="submit"
            disabled={isLoadingNewUser}
            className="bg-skyBlue text-white rounded-lg flex items-center justify-center hover:bg-[#3255e2] mx-auto w-full my-6 py-3 px-4"
          >
            {isLoadingNewUser ? (
              <span className="italic">Loading...</span>
            ) : (
              <span>Sign up</span>
            )}
          </Button>
        </form>
      </Form>

      <div className="pt-7 pb-2 after:border-lightGray relative text-center text-sm after:absolute after:insert-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="text-lighterGray relative z-10 px-2">
          Or continue with
        </span>
      </div>

      <Button
        asChild
        type="button"
        size="lg"
        className="w-full max-w-[250px] rounded-lg h-12 shadow-none border border-lightGray dark:border-lightGray bg-transparent borrounded-[12px] text-primaryText font-medium text-base tracking-[0.5px] my-3 hover:bg-transparent hover:border-darkGray dark:hover:border-lighterGray duration-500"
      >
        <a href={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/google`}>
          <img src={googleLogo} alt="Google Logo" className="w-[24px] mr-1" />{" "}
          Google
        </a>
      </Button>

      <small className="text-lighterGray mt-5 font-normal text-sm tracking-[-0.2px] pt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-primaryText">
          Login
        </Link>
      </small>
    </section>
  );
};

export default SignUpAuthForm;
