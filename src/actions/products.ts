/* eslint-disable @typescript-eslint/no-explicit-any */
import { Axios } from "@/lib/Axios";

export const getProducts = async (searchQuery: URLSearchParams) => {
  const { data } = await Axios.get(`/api/products?${searchQuery}`);
  return data;
};

export const addProductAction = async (values: any) => {
  const formData = new FormData();
  formData.append("category", values.category);
  formData.append("subcategory", values.subcategory);
  formData.append("name", values.name);
  formData.append("price", values.price);
  formData.append("stock", values.stock);
  formData.append("discount", values.discount);
  formData.append("description", values.description);
  formData.append("cover", values.cover[0]);
  formData.append("feature", values.feature[0]);
  formData.append("feature", values.feature[1]);
  const { data } = await Axios.post("/api/product", formData);
  return data;
};
export const updateProductAction = async (values: any) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("price", values.price);
  formData.append("stock", values.stock);
  formData.append("discount", values.discount);
  formData.append("description", values.description);
  formData.append("cover", values.cover[0]);
  formData.append("feature", values.feature[0]);
  formData.append("feature", values.feature[1]);
  const { data } = await Axios.put(`/api/products/${values.id}`, formData);
  return data;
};
export const deleteProductById = async (id: string) => {
  const { data } = await Axios.delete(`/api/products/${id}`);
  return data;
};
export const getProductById = async (id: string) => {
  const { data } = await Axios.get(`/api/products/${id}`);
  return data.data;
};
