import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface AuthStore {
  isAdimn: boolean;
  isLoading: boolean;
  error: string | null;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdimn: false,
  isLoading: false,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoading: false, error: null });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdimn: response.data.admin });
    } catch (error: any) {
      set({ isAdimn: false, error: error.response.data.message });
    } finally {
      set({ isLoading: true });
    }
  },

  reset: () => set({ isAdimn: false, isLoading: false, error: null }),
}));
