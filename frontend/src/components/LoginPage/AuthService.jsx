// src/components/Auth/AuthService.jsx
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Adjust as needed

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, { username, password });
      if (response.data.access) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("role", response.data.role); // Store user role
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  },

  getCurrentRole: () => {
    return localStorage.getItem("role");
  },

  getAccessToken: () => {
    return localStorage.getItem("access_token");
  },
};

export default AuthService;
