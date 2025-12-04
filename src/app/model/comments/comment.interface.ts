import { User } from "../auth/user.interface";

export interface Comment {
  id: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  user: User;
}
