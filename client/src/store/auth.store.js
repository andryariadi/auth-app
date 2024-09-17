import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async ({ username, email, password }) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up!",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/verify-email`, { code });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return res.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email!",
        isLoading: false,
      });
      throw error;
    }
  },

  chackAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/check-auth`);

      set({
        user: res.data.user,
        isCheckingAuth: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error checking auth!",
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },
}));

export default useAuthStore;
