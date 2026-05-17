import { useMutation } from "@tanstack/react-query";
import { createLp } from "../../apis/lpAPI";
import { queryClient } from "../../App";

function useCreateLp() {
  return useMutation({
    mutationFn: (lpData: {
      title: string;
      content: string;
      tags: string[];
      thumbnail: string;
      published: boolean;
    }) => createLp(lpData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lps"],
        exact: false,
      });
    },
  });
}

export default useCreateLp;
