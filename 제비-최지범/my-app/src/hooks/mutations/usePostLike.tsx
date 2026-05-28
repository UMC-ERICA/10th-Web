import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lpAPI";
import { queryClient } from "../../App";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["lp", data.data.lpId],
        exact: true,
      });
    },
  });
}

export default usePostLike;
