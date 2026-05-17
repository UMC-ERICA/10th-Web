import { useMutation } from "@tanstack/react-query";
import { updateComment } from "../../apis/lpAPI";
import { queryClient } from "../../App";

function useUpdateComment() {
  return useMutation({
    mutationFn: ({
      lpId,
      commentId,
      content,
    }: {
      lpId: number;
      commentId: number;
      content: string;
    }) => updateComment(lpId, commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
        exact: false,
      });
    },
  });
}

export default useUpdateComment;
