import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      loginApi(data),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoggingIn };
}
