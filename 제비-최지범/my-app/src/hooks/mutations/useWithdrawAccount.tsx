import { useMutation } from "@tanstack/react-query";
import { deleteMyAccount } from "../../apis/auth";
import { queryClient } from "../../App";
import { useAuth } from "../useAuth";

function useWithdrawAccount() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      logout();
      queryClient.removeQueries({ queryKey: ["myInfo"] });
    },
  });
}

export default useWithdrawAccount;
