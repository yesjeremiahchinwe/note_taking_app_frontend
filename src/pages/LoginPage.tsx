import LoginAuthForm from "@/components/forms/LoginAuthForm";
import useTitle from "@/hooks/useTitle";

const LoginPage = () => {
    useTitle("Login")
    
    return (
    <main className="bg-lightGray dark:bg-tagsBg flex justify-center items-center min-h-screen w-full px-4">
        <LoginAuthForm />
    </main>
)
}

export default LoginPage