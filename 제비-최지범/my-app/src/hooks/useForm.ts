import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm as useReactHookForm,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";

export type UseZodFormProps<TFieldValues extends FieldValues> = Omit<
  UseFormProps<TFieldValues>,
  "resolver"
> & {
  schema: z.ZodTypeAny;
};

export function useForm<TFieldValues extends FieldValues>(
  props: UseZodFormProps<TFieldValues>,
): UseFormReturn<TFieldValues> {
  const { schema, ...formOptions } = props;
  return useReactHookForm<TFieldValues>({
    ...formOptions,
    resolver: zodResolver(schema),
  });
}
