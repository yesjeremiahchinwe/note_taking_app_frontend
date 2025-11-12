import { useEffect, useState } from "react";

const useDebouncedValue = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    let handler: any;

    if (inputValue?.trim()) {
      handler = setTimeout(() => {
        localStorage.setItem("searchTerm", inputValue.trim());
        setDebouncedValue(inputValue.trim());
      }, delay);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

export default useDebouncedValue;
