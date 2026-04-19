import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../api/projects";
import { useAuth } from "../context/authContext";

export const useLoginMutation = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      login(data.token);
    },
    onError: (error) => {
      console.log(error);
      console.log(error.response?.data?.error || "Login Failed");
    },
  });
};
