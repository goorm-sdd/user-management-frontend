import axiosInstance from "../lib/axiosInstance";

// export const login = async ({ email, password }) => {
//   const res = await axiosInstance.post("/api/auth/signin", {
//     email,
//     password,
//   });

//   return res.data;
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
