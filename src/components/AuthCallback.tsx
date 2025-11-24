// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { account } from "../lib/appwrite";

export default function AuthCallback() {
  useEffect(() => {
    const verifySession = async () => {
      try {
        await account.get(); // checks Appwrite session cookie
        window.location.href = "/"; // redirect to your home page
      } catch (error) {
        console.error("Appwrite session not found", error);
        window.location.href = "/login"; // redirect if login fails
      }
    };

    verifySession();
  }, []);

  return <p>Signing you in...</p>;
}
