import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AxiosResponse } from "axios";

import type User from "@/models/User";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";

import { loginUser, logoutUser } from "@/services/AuthService";

type AuthState = {
  accessToken: string | null;
  authLoading: boolean;
  user: User | null;
  authStatus: boolean;

  login: (
    loginData: LoginData
  ) => Promise<AxiosResponse<LoginResponseData>>;

  logout: () => Promise<void>;
  checkLogin: () => boolean;
};

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      login: async (loginData) => {
        set({ authLoading: true });

        try {
          const response = await loginUser(loginData);

          set({
            accessToken: response.data.access_token,
            user: response.data.user,
            authStatus: true,
          });

          console.log("STORE UPDATED");

          return response;
        } catch (error) {
          console.error("Login Error:", error);
          throw error;
        } finally {
          set({ authLoading: false });
        }
      },

      logout: async () => {
        try {
          await logoutUser();
        } catch (error) {
          console.error("Logout Error:", error);
        } finally {
          set({
            accessToken: null,
            user: null,
            authStatus: false,
            authLoading: false,
          });
        }
      },

      checkLogin: () => {
        const state = get();

        console.log("CHECK LOGIN:", {
          accessToken: state.accessToken,
          authStatus: state.authStatus,
        });

        return !!(state.accessToken && state.authStatus);
      },
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        authStatus: state.authStatus,
      }),
    }
  )
);

export default useAuth;