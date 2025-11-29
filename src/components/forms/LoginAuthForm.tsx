import { LogoSVG } from "@/lib/icons";
import googleLogo from "/images/google-logo.png";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoginMutation } from "@/store/auth/authApiSlice";
import { setCredentials } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginFormValidationSchema } from "@/lib/formValidations";
import { useSelector } from "react-redux";

const LoginAuthForm = () => {
  const [showPassord, setShowPassword] = useState<boolean>(false);
  const username = useSelector((state: any) => state.auth.username);
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    login,
    {
      isLoading: isLoadingLogin,
      isSuccess: isSuccessLogin,
      isError: isErrorLogin,
      error: errorLogin,
    },
  ] = useLoginMutation();

  const form = useForm<z.infer<typeof loginFormValidationSchema>>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccessLogin) {
      toast.success(
        username ? `Welcome back, ${username}!` : "Login successful!"
      );
      setErrMsg("");
      navigate("/");
    }

    if (isErrorLogin) {
      setErrMsg(
        //@ts-ignore
        errorLogin.data?.message ||
          "Oops! Something went wrong! Please try again."
      );
    }
  }, [isSuccessLogin, isErrorLogin]);

  const onSubmit = async (
    values: z.infer<typeof loginFormValidationSchema>
  ) => {
    try {
      const { accessToken, id, username } = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ accessToken, id, username }));
    } catch (err: any) {
      //@ts-ignore
      toast.error(err?.data?.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <section className="max-w-[540px] w-full flex flex-col justify-center items-center bg-background border border-lightGray rounded-[12px] max-sm:px-4 p-[48px]">
      <LogoSVG color="currentColor" />

      <h1 className="font-bold text-2xl text-center tracking-[-0.5px] text-primaryText mt-5 mb-2">
        Welcome to NotesFlow
      </h1>
      <p className="font-normal text-sm text-center tracking-[-0.2px] text-lighterGray">
        Please log in to continue
      </p>

      {errMsg && <p className="text-lightRed pt-2">{errMsg}</p>}

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
                  {/* {isLogin && (
                    <Link
                      to="/forgot-password"
                      className="text-lighterGray dark:text-[#99A0AE] font-normal text-xs underline"
                    >
                      Forgot
                    </Link>
                  )} */}
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

                <FormMessage className="text-lightRed" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoadingLogin}
            className="bg-skyBlue text-white rounded-lg flex items-center justify-center hover:bg-[#3255e2] mx-auto w-full my-6 py-3 px-4"
          >
            {isLoadingLogin ? (
              <span className="italic">Loading...</span>
            ) : (
              <span>Login</span>
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
        No account yet?{" "}
        <Link to="/create" className="text-primaryText">
          Sign Up
        </Link>
      </small>
    </section>
  );
};

export default LoginAuthForm;
