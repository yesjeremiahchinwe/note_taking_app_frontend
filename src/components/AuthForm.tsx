import { LogoSVG } from "@/lib/icons";
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
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import { useState } from "react";
import { useLoginMutation } from "@/store/auth/authApiSlice";
import { useAddNewUserMutation } from "@/store/users/usersApiSlice";
import { setCredentials } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { Theme } from "@/providers/theme-provider";

const formSchema = z.object({
  email: z.string().email({message: "Please provide a valid email address"}),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const AuthForm = ({ title, description, isLogin }: AuthFormProp) => {
  const [showPassord, setShowPassword] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, {isLoading: isLoadingLogin}] = useLoginMutation()
  const [addNewUser, { isLoading: isLoadingNewUser}] = useAddNewUserMutation()
  const [theme] = useState<Theme>(
        () => (localStorage.getItem('notes-theme') as Theme) || 'system'
      )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isLogin) {
        const { accessToken } = await login({ email: values.email, password: values.password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        toast({
          title: 'Login successfully!',
          description: `You are currently logged in as ${values.email}`
        })
        navigate("/")
      } else {
        await addNewUser({ email: values.email, password: values.password })
        toast({
          title: 'Account created successfully!',
          description: `You signed up for an account using the email ${values.email}`
        })
        navigate("/login")
      }
  } catch (err: any) {
      if (!err.status) {
          setErrMsg('No Server Response');
      } else if (err.status === 400) {
          setErrMsg('Invalid Credentials');
      } else if (err.status === 401) {
          setErrMsg('Unauthorized');
      } else if (err.status === 409) {
          setErrMsg('Conflict');
      } else {
          setErrMsg(err.data?.message);
      }
  }
  }


  return (
    <section className="max-w-[540px] w-full flex flex-col justify-center items-center bg-background border border-lightGray rounded-[12px] p-[48px]">
      <LogoSVG color={(theme === "system" || theme === "dark") ? "#FFF" : "#0E121B"} />

      <h1 className="font-bold text-2xl tracking-[-0.5px] text-primaryText mt-5 mb-2">
        {title}
      </h1>
      <p className="font-normal text-sm tracking-[-0.2px] text-lighterGray">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="relative">
                <FormLabel className="text-primaryText font-medium text-sm tracking-[-0.2px] flex items-center justify-between">
                  Password{" "}
                  {isLogin && (
                  <Link
                    to="/forgot-password"
                    className="text-lighterGray dark:text-[#99A0AE] font-normal text-xs underline"
                  >
                    Forgot
                  </Link>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type={showPassord ? "text" : "password"}
                    className={`${
                      fieldState.error && "border-lightRed"
                    }`}
                    {...field}
                  />
                </FormControl>

                <EyeIcon
                  onClick={() => setShowPassword((prev) => !prev)}
                  color={(theme === "system" || theme === "dark") ? "#CACFD8" : "#525866"}
                  size={18}
                  className={`absolute top-[32px] right-4 cursor-pointer ${
                    !showPassord ? "block" : "hidden"
                  }`}
                />

                <EyeOffIcon
                  onClick={() => setShowPassword((prev) => !prev)}
                  color={(theme === "system" || theme === "dark") ? "#CACFD8" : "#525866"}
                  size={18}
                  className={`absolute top-[32px] right-4 cursor-pointer ${
                    showPassord ? "block" : "hidden"
                  }`}
                />

                {!isLogin && (
                    <FormDescription className="text-lighterGray dark:text-[#99A0AE] flex items-center gap-1">
                    <InfoIcon color={(theme === "system" || theme === "dark") ? "#99A0AE" : "#525866"} size={16} /> <span>At least 8 characters</span>
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

      {/* <div className="border-b-[1px] border-[#E0E4EA] my-5 w-full" />

      <p className="text-lighterGray font-normal text-sm tracking-[-0.2px] py-2">Or log in with:</p>

      <Button size="lg" className="w-full bg-transparent borrounded-[12px] text-primaryText font-medium text-base tracking-[0.5px] my-3 hover:bg-transparent hover:border-[#0E121B] duration-500"><img src={googleLogo} alt="Google Logo" className="w-[24px] mr-1" /> Google</Button> */}

      {/* <div className="border-b-[1px] border-[#E0E4EA] my-3 w-full" /> */}

      {isLogin ? (
        <small className="text-lighterGray mt-5 font-normal text-sm tracking-[-0.2px] pt-3">No account yet? <Link to="/create" className="text-primaryText">Sign Up</Link></small>
      ) : (
        <small className="text-lighterGray mt-5 font-normal text-sm tracking-[-0.2px] pt-3">Already have an account? <Link to="/login" className="text-primaryText">Login</Link></small>
      )}
    </section>
  );
};

export default AuthForm;
