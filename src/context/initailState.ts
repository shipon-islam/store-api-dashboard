import { UserType } from "@/types/users";

export type contextValueType = {
  user: UserType;
};
export const contextValue: contextValueType = {
  user: {
    avatar: "",
    email: "",
    name: "",
    role: "",
    updatedAt: new Date(),
    createdAt: new Date(),
    _id: "",
  },
};
