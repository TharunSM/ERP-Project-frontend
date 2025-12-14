import { Project } from "./project.model";

export interface User {
    userId?: number;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    mobileNumber?: number;
    role?: string;
    project?: Project[];
}
