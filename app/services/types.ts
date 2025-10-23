export interface IClient {
    id: string;
    fullName: string;
    email: string;
    message?: string;
    createdAt: Date;
}