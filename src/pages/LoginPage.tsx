import AuthForm from "@/components/forms/AuthForm"
import useTitle from "@/hooks/useTitle";

const LoginPage = () => {
    useTitle("Login")
    
    return (
    <main className="bg-lightGray dark:bg-tagsBg flex justify-center items-center min-h-screen w-full px-4">
        <AuthForm title="Welcome to Note" description="Please log in to continue" isLogin={true} />
    </main>
)
}

export default LoginPage