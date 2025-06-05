import * as yup from "yup";

const name = yup.string().required("이름 입력은 필수입니다.");
const email = yup
  .string()
  .required("이메일 입력은 필수입니다.")
  .matches(
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
    "이메일 형식이 올바르지 않습니다."
  );
const phone = yup
  .string()
  .required("전화번호 입력은 필수입니다.")
  .matches(
    /^01[016789]-?\d{3,4}-?\d{4}$/,
    "휴대폰 번호 형식이 올바르지 않습니다."
  );
const code = yup
  .string()
  .required("인증번호 입력은 필수입니다.")
  .length(6, "인증번호는 6자리여야 합니다.");

export const signInSchema = yup.object({
  email,
  password: yup
    .string()
    .required("비밀번호 입력은 필수입니다.")
    .min(6, "비밀번호는 최소 6자 이상 입력해야 합니다")
    .max(15, "비밀번호는 최대 15자까지 입력할 수 있습니다"),
});

export const findIdSchema = yup.object({
  name,
  phone,
  code,
});

export const resetPasswordSchema = yup.object({
  name,
  email,
  phone,
  code,
});
