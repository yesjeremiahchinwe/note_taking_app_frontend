import { LogoSVG } from "@/lib/icons";
import googleLogo from "/images/google-logo.png";
import { AuthFormProp } from "@/lib/types";
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
import {
  useLoginMutation,
  useAddNewUserMutation,
} from "@/store/auth/authApiSlice";
import { setCredentials } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginAndSignUpFormValidationSchema } from "@/lib/formValidations";

const AuthForm = ({ title, description, isLogin }: AuthFormProp) => {
  const [showPassord, setShowPassword] = useState<boolean>(false);
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

  const [
    addNewUser,
    {
      isLoading: isLoadingNewUser,
      isSuccess: isSuccessAddNewUser,
      isError: isErrorAddNewUser,
      error: errorAddNewUser,
    },
  ] = useAddNewUserMutation();

  const form = useForm<z.infer<typeof loginAndSignUpFormValidationSchema>>({
    resolver: zodResolver(loginAndSignUpFormValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccessAddNewUser) {
      toast.success("Account created successfully!");
      setErrMsg("");
      navigate("/");
    }

    if (isErrorAddNewUser) {
      setErrMsg(
        //@ts-ignore
        errorAddNewUser.data?.message ||
          "Oops! Something went wrong! Please try again."
      );
    }
  }, [isSuccessAddNewUser, isErrorAddNewUser]);

  useEffect(() => {
    if (isSuccessLogin) {
      toast.success("Login successfully!");
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
    values: z.infer<typeof loginAndSignUpFormValidationSchema>
  ) => {
    try {
      if (isLogin) {
        const { accessToken, id } = await login({
          email: values.email,
          password: values.password,
        }).unwrap();
        dispatch(setCredentials({ accessToken, id }));
      } else {
        const { accessToken, id } = await addNewUser({
          email: values.email,
          password: values.password,
        }).unwrap();
        dispatch(setCredentials({ accessToken, id }));
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <section className="max-w-[540px] w-full flex flex-col justify-center items-center bg-background border border-lightGray rounded-[12px] max-sm:px-4 p-[48px]">
      <LogoSVG color="currentColor" />

      <h1 className="font-bold text-2xl text-center tracking-[-0.5px] text-primaryText mt-5 mb-2">
        {title}
      </h1>
      <p className="font-normal text-sm text-center tracking-[-0.2px] text-lighterGray">
        {description}
      </p>

      {errMsg && <p className="text-lightRed">{errMsg}</p>}

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
                  className={`absolute top-[24px] right-4 cursor-pointer ${
                    !showPassord ? "block" : "hidden"
                  }`}
                />

                <EyeOffIcon
                  onClick={() => setShowPassword((prev) => !prev)}
                  color="currentColor"
                  size={18}
                  className={`absolute top-[24px] right-4 cursor-pointer ${
                    showPassord ? "block" : "hidden"
                  }`}
                />

                {!isLogin && (
                  <FormDescription className="text-lighterGray dark:text-[#99A0AE] flex items-center gap-1">
                    <InfoIcon color="currentColor" size={16} />{" "}
                    <span>At least 8 characters</span>
                  </FormDescription>
                )}

                <FormMessage className="text-lightRed" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoadingLogin}
            className="bg-skyBlue text-white rounded-lg flex items-center justify-center hover:bg-[#3255e2] mx-auto w-full my-6 py-3 px-4"
          >
            {isLoadingLogin || isLoadingNewUser ? (
              <span className="italic">Loading...</span>
            ) : (
              <span>{isLogin ? "Login" : "Sign up"}</span>
            )}
          </Button>
        </form>
      </Form>

      <div className="border-b-[1px] border-[#E0E4EA] my-5 w-full" />

       <p className="text-lighterGray font-normal text-sm tracking-[-0.2px] py-2">
        Or log in with:
      </p>

      <Button
        asChild
        type="button"
        size="lg"
        className="w-full bg-transparent borrounded-[12px] text-primaryText font-medium text-base tracking-[0.5px] my-3 hover:bg-transparent hover:border-[#0E121B] duration-500"
      >
        <a href={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/google`}>
          <img src={googleLogo} alt="Google Logo" className="w-[24px] mr-1" />{" "}
          Google
        </a>
      </Button>

      {/* <div className="border-b-[1px] border-[#E0E4EA] my-3 w-full" /> */}

      {isLogin ? (
        <small className="text-lighterGray mt-5 font-normal text-sm tracking-[-0.2px] pt-3">
          No account yet?{" "}
          <Link to="/create" className="text-primaryText">
            Sign Up
          </Link>
        </small>
      ) : (
        <small className="text-lighterGray mt-5 font-normal text-sm tracking-[-0.2px] pt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-primaryText">
            Login
          </Link>
        </small>
      )}
    </section>
  );
};

export default AuthForm;
