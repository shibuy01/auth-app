import type RegisterData from "@/models/RegistorData"
import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";

//Registor Function...
export const registerUser =async (signupData: RegisterData) => {
    //api call from data
    const response = await apiClient.post("/auth/register", signupData);
    return response;
};

export const loginUser = async(loginData: LoginData) => {
        
        const responese = await apiClient.post("/auth/login", loginData);
        return responese;
};