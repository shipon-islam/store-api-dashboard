import { Axios } from "@/lib/Axios";

export const getCategories = async () => {
  const { data } = await Axios.get("/api/categories");
  return data;
};
export const createCategory = async (name: string) => {
  const { data } = await Axios.post("/api/category", { name });
  return data;
};
export const createSubCategory = async (catObject: {
  id: string;
  name: string;
}) => {
  const { data } = await Axios.post(
    `/api/categories/${catObject.id}/subcategory`,
    {
      name: catObject.name,
    }
  );
  return data;
};
