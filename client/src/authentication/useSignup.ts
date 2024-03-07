import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: (data: {
      name: string;
      username: string;
      password: string;
      confirmPassword: string;
    }) => signupApi(data),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isSigningUp };
}
