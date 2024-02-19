import { Axios } from "@/lib/Axios";
import { loginType } from "@/types/users";

export const getUsers = async () => {
  const { data } = await Axios.get(`/api/users`);
  return data.data;
};
export const getUserbyId = async (id: string) => {
  const { data } = await Axios.get(`/api/users/${id}`);
  return data.data;
};
export const deleteUserbyId = async (id: string) => {
  const { data } = await Axios.delete(`/api/users/${id}`);
  return data;
};
export const loginUser = async (user: loginType) => {
  const { data } = await Axios.post(`/api/login`, user);
  return data;
};
