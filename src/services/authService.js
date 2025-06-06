import axiosInstance from "../libs/axiosInstance";

// 로그인
// export const login = async ({ email, password }) => {
//   const res = await axiosInstance.post("/api/auth/signin", {
//     email,
//     password,
//   });
//   return res.data;
// };

// 이메일 찾기
// export const findEmail = async ({ name, phone, code }) => {
//   try {
//     const response = await axios.post("/api/auth/find/email", {
//       username: name,
//       phoneNumber: phone,
//       code,
//     });
//     return response.data;
// };

// 인증번호 발송
// export const sendVerificationCode = async (phone) => {
//   const response = await axiosInstance.post("/api/auth/phone/send", { phoneNumber: phone });
//   return response.data;
// };

// 인증번호 확인
// export const verifyCode = async ({ phone, code }) => {
//   const response = await axiosInstance.post("/api/auth/phone/verify", { phoneNumber: phone, code });
//   return response.data;
// };

export const login = async ({ email, password }) => {
  await new Promise((r) => setTimeout(r, 500));

  // 실패 테스트 (비밀번호 틀림)
  if (password !== "password123") {
    const error = new Error("비밀번호가 틀렸습니다.");
    error.response = { data: { message: "비밀번호가 틀렸습니다." } };
    throw error;
  }

  // 성공 시
  return {
    data: {
      accessToken: "mocked-access-token",
      user: {
        id: 1,
        username: "홍길동",
        email,
        role: email === "admin@example.com" ? "ADMIN" : "USER",
      },
    },
  };
};

export const findEmail = async ({ name, phone, code, sentCode }) => {
  await new Promise((r) => setTimeout(r, 500)); // 요청 지연 효과

  // 임의 조건: 인증번호는 123456으로 고정
  if (code !== sentCode) {
    const error = new Error("인증번호가 올바르지 않습니다.");
    error.response = { data: { message: "인증 실패" } };
    throw error;
  }

  // 성공 응답
  return {
    data: {
      email: "info@example.com",
    },
  };
};
