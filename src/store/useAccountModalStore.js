import { create } from 'zustand';

const useAccountModalStore = create((set) => ({
  step: null,
  isOpen: false,
  userData: {},

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  openStep: (step) => set({ isOpen: true, step }),
  nextStep: (step) => set({ step }),
  resetModal: () => set({ step: null, userData: {} }),
  updateUserData: (data) =>
    set((state) => ({ userData: { ...state.userData, ...data } })),
}));

export default useAccountModalStore;