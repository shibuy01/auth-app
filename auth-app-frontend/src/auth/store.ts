import { create } from "zustand";
import type User from "@/models/User";

const TOKEN_KEY = "auth_app";

//type AuthStatus = "idle" | "authenticating" | "authenticated" | "anonymous";

type AuthState = {
    accessToken: string | null;
    user: User | null;
    authStatus:true;
};