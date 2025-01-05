import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useDebouncedValue = (inputValue: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [inputValue, delay])

    useEffect(() => {
        let handler: any

        if (inputValue) {
            localStorage.setItem("searchTerm", inputValue)
            
            handler = setTimeout(() => {
                navigate("/search")
            }, delay)
        }

        return () => {
            clearTimeout(handler)
        }
    }, [inputValue])

  return debouncedValue
}

export default useDebouncedValue