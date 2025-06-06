import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null });
  },
}));

export default useAuthStore;
