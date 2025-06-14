import axiosInstance from "../libs/axiosInstance";

// 로그인 요청 (일반/관리자 구분)
export const login = async ({ email, password }) => {
  const response = await axiosInstance.post("/api/auth/signin", {
    email,
    password,
  });
  return response.data;
};

// 로그아웃 요청
export const logout = async (isAdmin = false) => {
  const url = isAdmin ? "/api/admin/signout" : "/api/signout";
  return await axiosInstance.post(url);
};

// 인증번호 발송
export const sendVerificationCode = async (phoneNumber) => {
  const response = await axiosInstance.post("/api/auth/phone/send", {
    phoneNumber,
  });
  return response.data;
};

// 인증번호 확인
export const verifyCode = async ({ phoneNumber, code }) => {
  const response = await axiosInstance.post("/api/auth/phone/verify", {
    phoneNumber,
    code,
  });
  return response.data;
};

// 이메일 찾기
export const findEmail = async ({ username, phoneNumber, code }) => {
  const response = await axiosInstance.post("/api/auth/find/email", {
    username,
    phoneNumber,
    code,
  });
  return response.data;
};

// 임시 비밀번호 발송
export const resetPassword = async ({ username, email }) => {
  const response = await axiosInstance.post("/api/auth/find/password", {
    username,
    email,
  });
  return response.data;
};

// 대시보드
export const fetchDashboardUsers = async (pageNum, pageLimit) => {
  const response = await axiosInstance.get(
    `/api/admin/users/dashboard?pageNum=${pageNum}&pageLimit=${pageLimit}`
  );
  return response.data.data;
};

// 이름 검색
export const searchUsersByName = async (username, pageNum, pageLimit) => {
  const response = await axiosInstance.get(
    `/api/admin/users/search?username=${username}&pageNum=${pageNum}&pageLimit=${pageLimit}&sortBy=createdAt&sortDir=desc`
  );
  return response.data.data;
};

// 이메일 검색
export const searchUsersByEmail = async (email, pageNum, pageLimit) => {
  const response = await axiosInstance.get(
    `/api/admin/users/search?email=${email}&pageNum=${pageNum}&pageLimit=${pageLimit}&sortBy=createdAt&sortDir=asc`
  );
  return response.data.data;
};
