import { create } from "zustand";
import type User from "@/models/User";

const LOCAL_KEY = "auth_state";

//type AuthStatus = "idle" | "authenticating" | "authenticated" | "anonymous";

type LoginResponseData={
    accessToken:string,
    user:User
}

type AuthState = {
    accessToken: string | null;
    user: User | null;
    authStatus:true;

    login:(loginData:LoginResponseData) => void;
    logout:(options?:{ sildent?: boolean} )=> Promise<void>

};

