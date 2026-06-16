import type RegisterData from "@/models/RegistorData"
import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";

//Registor User Function...
export const registerUser =async (signupData: RegisterData) => {
    //API Call From Data
    const response = await apiClient.post("/auth/register", signupData);
    return response;
};


// Login User Function...
export const loginUser = async(loginData: LoginData) => {
        
        // API Call Frome Data
        const responese = await apiClient.post<LoginResponseData>("/auth/login", loginData);
        return responese;
};

// Logout User Function...
export const logoutUser = async () => {
    
    // API Call Frome Data
    const response = await apiClient.post("/auth/logout");
    return response.data;
}