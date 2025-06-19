import axiosInstance from "../libs/axiosInstance";
import axios from "axios";

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
  const accessToken = sessionStorage.getItem("accessToken");

  try {
    const res = await axiosInstance.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    // ✅ accessToken 삭제
    sessionStorage.removeItem("accessToken");

    return res.data;
  } catch (err) {
    console.warn("로그아웃 중 오류 발생", err);
    sessionStorage.removeItem("accessToken"); // 실패해도 제거는 함
    throw err;
  }
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
export const resetPassword = async ({ username, email, phoneNumber, code }) => {
  const response = await axiosInstance.post("/api/auth/find/password", {
    username,
    email,
    phoneNumber,
    code,
  });
  return response.data;
};

// 대시보드
export const fetchDashboardUsers = async (pageNum, pageLimit, filters = {}) => {
  const params = {
    pageNum,
    pageLimit,
    ...filters,
  };
  console.log("Fetch Dashboard Users Params:", params);

  const response = await axiosInstance.get("/api/admin/users/dashboard", {
    params,
  });
  return response.data.data;
};

// 검색
export const searchUsers = async (
  searchType,
  searchQuery,
  pageNum,
  pageLimit,
  filters = {}
) => {
  const params = {
    pageNum,
    pageLimit,
    ...filters,
  };

  console.log("Search Users Params:", params);

  if (searchType === "email") {
    params.email = searchQuery;
  } else if (searchType === "username") {
    params.username = searchQuery;
  }

  const response = await axiosInstance.get("/api/admin/users/search", {
    params,
  });

  return response.data.data;
};

// 유저 프로필 (내 프로필)
export const myProfile = async () => {
  const response = await axiosInstance.get("/api/users/me");
  return response.data;
};

// 비밀번호 인증
export const verifyPassword = async ({ password }) => {
  return axiosInstance.post("/api/users/password/verify", { password });
};

// 비밀번호 변경
export const changePassword = (newPassword, newPasswordCheck, reauthToken) => {
  return axios.patch(
    "https://3.39.233.161/api/users/me/password", // 풀 URL로
    { newPassword, newPasswordCheck },
    {
      headers: {
        Authorization: `Bearer ${reauthToken}`,
      },
      withCredentials: true, // 쿠키 필요 시
    }
  );
};

// 전화번호 변경
export const verifyPhoneCodeAndChangeNumber = async ({
  phoneNumber,
  reauthToken,
}) => {
  const response = await axios.patch(
    "https://3.39.233.161/api/users/me/phone",
    { phoneNumber },
    {
      headers: {
        Authorization: `Bearer ${reauthToken}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// 회원 탈퇴 요청
export const deleteAccount = async (reauthToken) => {
  const response = await axios.patch(
    "https://3.39.233.161/api/users/me/status",
    { status: "deleted" },
    {
      headers: {
        Authorization: `Bearer ${reauthToken}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// 회원가입
export const signUp = async ({
  username,
  email,
  password,
  passwordCheck,
  phoneNumber,
  code,
}) => {
  const response = await axiosInstance.post("/api/auth/signup", {
    username,
    email,
    password,
    passwordCheck,
    phoneNumber,
    code,
  });
  return response.data;
};

// 이메일 중복 확인
export const checkEmailDuplicate = async (email) => {
  const response = await axiosInstance.post("/api/auth/email", {
    email,
  });
  return response.data;
};

// 회원 상태 변경
export const statusChange = async (userId, newStatus, reauthToken) => {
  const response = await axios.patch(
    `https://3.39.233.161/api/admin/users/status/${userId}`,
    { status: newStatus },
    {
      headers: {
        Authorization: `Bearer ${reauthToken}`,
      },
    }
  );
  return response.data;
};
