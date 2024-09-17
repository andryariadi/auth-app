import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/auth";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (fullname, email, password) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const res = await axios.post(`${API_URL}/signup`, {
        fullname,
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
}));

export default useAuthStore;
