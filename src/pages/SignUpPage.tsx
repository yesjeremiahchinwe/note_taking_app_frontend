import AuthForm from "@/components/forms/AuthForm";
import useTitle from "@/hooks/useTitle";

const SignUpPage = () => {
  useTitle("Sign Up");

  return (
    <main className="bg-lightGray dark:bg-tagsBg flex justify-center items-center min-h-screen w-full px-4">
      <AuthForm
        title="Create Your Account"
        description="Sign up to start organizing your notes and boost your productivity."
        isLogin={false}
      />
    </main>
  );
};

export default SignUpPage;
