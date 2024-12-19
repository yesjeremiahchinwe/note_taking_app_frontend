import { useState, useEffect } from 'react'

const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState(JSON.parse(localStorage.getItem("searchTerm") as string) as string)

    useEffect(() => {
        localStorage.setItem("searchTerm", JSON.stringify(searchTerm))
    }, [searchTerm])


  return { searchTerm, setSearchTerm }
}

export default useSearch