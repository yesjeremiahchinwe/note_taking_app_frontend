import AuthForm from "@/components/AuthForm"

const LoginPage = () => (
    <main className="bg-[#F3F5F8] flex justify-center items-center min-h-screen w-full px-4">
        <AuthForm title="Welcome to Note" description="Please log in to continue" isLogin={true} />
    </main>
)

export default LoginPage