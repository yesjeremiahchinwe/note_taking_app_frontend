import useTitle from "@/hooks/useTitle"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
    useTitle('Not found!')
    
  return (
    <section className="flex flex-col items-center justify-center h-screen w-full">
        <pre className="text-primaryText text-center">Oops! Page Not Found</pre>
        <Link to="/" className="text-primaryText underline text-center">Back to Home</Link>
    </section>
  )
}

export default NotFoundPage