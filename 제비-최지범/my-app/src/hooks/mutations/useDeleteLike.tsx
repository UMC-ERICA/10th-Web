import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lpAPI";
import type { LP } from "../../types/music";
import { queryClient } from "../../App";

type DeleteLikeVariables = {
  lpId: number;
  userId: number;
};

type DeleteLikeContext = {
  previousLp: LP | undefined;
};

function useDeleteLike() {
  return useMutation({
    mutationFn: ({ lpId }: DeleteLikeVariables) => deleteLike(lpId),

    onMutate: async ({ lpId, userId }) => {
      const queryKey = ["lp", lpId] as const;

      await queryClient.cancelQueries({ queryKey });

      const previousLp = queryClient.getQueryData<LP>(queryKey);

      if (previousLp) {
        queryClient.setQueryData<LP>(queryKey, {
          ...previousLp,
          likes: previousLp.likes.filter((like) => like.userId !== userId),
        });
      }

      return { previousLp } satisfies DeleteLikeContext;
    },

    onError: (_error, { lpId }, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData(["lp", lpId], context.previousLp);
      }
    },

    onSettled: (_data, _error, { lpId }) => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
    },
  });
}

export default useDeleteLike;
