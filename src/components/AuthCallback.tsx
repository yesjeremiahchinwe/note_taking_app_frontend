import { useNavigate, useSearchParams } from "react-router-dom";
import LoadiingState from "./HomeLoader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/auth/authSlice";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const accessToken = searchParams.get("accessToken");
  const userId = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken || userId) {
      dispatch(setCredentials({ accessToken, id: userId  }));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [accessToken, userId]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center italic">
      <LoadiingState message="Signing you in" />
    </section>
  );
}
