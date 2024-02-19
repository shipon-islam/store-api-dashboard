export type loginType = { email: string; password: string };
export interface UserType {
  avatar: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
