export default interface User {
    id: string;
    email: string;
    name?: string;
    enabled: boolean;
    image?: string;
    createdAt?: string;
    created_at?: string;
    provider: string;
}