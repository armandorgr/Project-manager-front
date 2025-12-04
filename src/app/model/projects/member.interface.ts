import { User } from "../auth/user.interface";
import { ProjectRole } from "./project.interface";

export interface Member {
    user: User,
    role: ProjectRole
}