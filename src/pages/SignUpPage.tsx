import SignUpAuthForm from "@/components/forms/SignUpAuthForm";
import useTitle from "@/hooks/useTitle";

const SignUpPage = () => {
  useTitle("Sign Up");

  return (
    <main className="bg-lightGray dark:bg-tagsBg flex justify-center items-center min-h-screen w-full py-6 px-4">
      <SignUpAuthForm />
    </main>
  );
};

export default SignUpPage;
