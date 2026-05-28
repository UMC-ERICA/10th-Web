import { useMutation } from "@tanstack/react-query";
import { postSignout } from "../../apis/auth";
import { queryClient } from "../../App";
import { useAuth } from "../useAuth";

function useLogout() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: postSignout,
    onSettled: () => {
      logout();
      queryClient.removeQueries({ queryKey: ["myInfo"] });
    },
  });
}

export default useLogout;
