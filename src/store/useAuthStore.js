import { create } from "zustand";

const savedUser =
  localStorage.getItem("user") || sessionStorage.getItem("user");
const parsedUser = savedUser ? JSON.parse(savedUser) : null;

const useAuthStore = create((set) => ({
  user: parsedUser,

  login: (user) => {
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    set({ user: null });
  },
}));

export default useAuthStore;
