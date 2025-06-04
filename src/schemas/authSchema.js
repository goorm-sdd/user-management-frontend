import * as yup from "yup";

const emailRegex =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

export const signInSchema = yup.object({
  email: yup
    .string()
    .required("이메일 입력은 필수입니다.")
    .matches(emailRegex, "이메일 형식이 올바르지 않습니다."),
  password: yup
    .string()
    .required("비밀번호 입력은 필수입니다.")
    .min(6, "비밀번호는 최소 6자 이상 입력해야 합니다")
    .max(15, "비밀번호는 최대 15자까지 입력할 수 있습니다"),
});
