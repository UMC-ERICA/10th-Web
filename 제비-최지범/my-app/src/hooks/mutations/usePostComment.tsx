import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../apis/lpAPI";
import { queryClient } from "../../App";

function usePostComment() {
  return useMutation({
    mutationFn: ({ lpId, content }: { lpId: number; content: string }) =>
      createComment(lpId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
        exact: false,
      });
    },
  });
}

export default usePostComment;
