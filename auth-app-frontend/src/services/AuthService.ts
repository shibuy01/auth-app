import type RegisterData from "@/models/RegistorData"
import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";

//Registor Function...
export const registerUser =async (signupData: RegisterData) => {
    //api call from data
    const response = await apiClient.post("/auth/register", signupData);
    return response;
};

export const loginUser = async(loginData: LoginData) => {
        
        const responese = await apiClient.post<LoginResponseData>("/auth/login", loginData);
        return responese;
};

export const logoutUser = async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
}