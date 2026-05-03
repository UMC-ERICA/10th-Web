import { z } from "zod";

export const signupFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "이름을 입력해 주세요.")
      .max(50, "이름은 50자 이하여야 합니다."),
    email: z
      .string()
      .min(1, "이메일을 입력해 주세요.")
      .email("이메일 형식이 올바르지 않습니다."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다."),
    passwordConfirm: z
      .string()
      .min(1, "비밀번호 확인을 입력해 주세요."),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type SignupFormValues = z.infer<typeof signupFormSchema>;
