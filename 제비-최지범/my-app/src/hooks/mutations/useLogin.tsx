import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import type { RequestSigninDto } from "../../types/auth";
import { useAuth } from "../useAuth";

function useLogin() {
  const { setTokens } = useAuth();

  return useMutation({
    mutationFn: (body: RequestSigninDto) => postSignin(body),
    onSuccess: (res) => {
      const { accessToken, refreshToken } = res.data;
      setTokens(accessToken, refreshToken);
    },
  });
}

export default useLogin;
