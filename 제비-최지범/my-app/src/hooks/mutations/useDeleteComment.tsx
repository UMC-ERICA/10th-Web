import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../apis/lpAPI";
import { queryClient } from "../../App";

function useDeleteComment() {
  return useMutation({
    mutationFn: ({ lpId, commentId }: { lpId: number; commentId: number }) =>
      deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
        exact: false,
      });
    },
  });
}

export default useDeleteComment;
