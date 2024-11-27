import AuthForm from "@/components/AuthForm"

const SignUpPage = () => (
    <main className="bg-[#F3F5F8] flex justify-center items-center min-h-screen w-full px-4">
        <AuthForm title="Create Your Account" description="Sign up to start organizing your notes and boost your productivity." isLogin={false} />
    </main>
)

export default SignUpPage