import { create } from "zustand";
import { logout as apiLogout } from "../services/authService";

const savedUser =
  localStorage.getItem("user") || sessionStorage.getItem("user");
const parsedUser = savedUser ? JSON.parse(savedUser) : null;

const useAuthStore = create((set, get) => ({
  user: parsedUser,

  login: (user) => {
    set({ user });
  },

  logout: async () => {
    const userRole = get().user?.role;
    const isAdmin = userRole === "ADMIN";

    try {
      await apiLogout(isAdmin); // 실제 API에 로그아웃 요청
    } catch (error) {
      console.error("서버 로그아웃 실패:", error); // 서버 에러는 별도로 기록
    }

    // 클라이언트 상태 정리
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");

    set({ user: null });
  },
}));

export default useAuthStore;
