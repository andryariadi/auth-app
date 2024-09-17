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
    console.log(username, email, password, "<---disignupprops");

    set({
      isLoading: true,
      error: null,
    });

    try {
      const res = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });

      console.log(res.data.user, "<---disignupstore");

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
