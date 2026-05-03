import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .email("이메일 형식이 올바르지 않습니다."),
  password: z.string().min(1, "비밀번호를 입력해 주세요."),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
