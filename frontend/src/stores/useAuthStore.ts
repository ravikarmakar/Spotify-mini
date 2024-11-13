import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface AuthStore {
  isAdimn: boolean;
  isLoaded: boolean;
  error: string | null;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdimn: false,
  isLoaded: false,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoaded: false, error: null });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdimn: response.data.admin });
    } catch (error: any) {
      set({ isAdimn: false, error: error.response.data.message });
    } finally {
      set({ isLoaded: true });
    }
  },

  reset: () => set({ isAdimn: false, isLoaded: false, error: null }),
}));
