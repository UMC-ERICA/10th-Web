import { useMutation } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import type {
  RequestUpdateMyInfoDto,
  ResponseMyInfoDto,
} from "../../types/auth";
import { queryClient } from "../../App";

type UpdateMyInfoContext = {
  previousMyInfo: ResponseMyInfoDto | undefined;
};

function useUpdateMyInfo() {
  return useMutation({
    mutationFn: (body: RequestUpdateMyInfoDto) => patchMyInfo(body),

    onMutate: async (body) => {
      const queryKey = ["myInfo"] as const;

      await queryClient.cancelQueries({ queryKey });

      const previousMyInfo =
        queryClient.getQueryData<ResponseMyInfoDto>(queryKey);

      if (previousMyInfo) {
        queryClient.setQueryData<ResponseMyInfoDto>(queryKey, {
          ...previousMyInfo,
          data: {
            ...previousMyInfo.data,
            ...body,
          },
        });
      }

      return { previousMyInfo } satisfies UpdateMyInfoContext;
    },

    onError: (_error, _body, context) => {
      if (context?.previousMyInfo) {
        queryClient.setQueryData(["myInfo"], context.previousMyInfo);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
}

export default useUpdateMyInfo;
