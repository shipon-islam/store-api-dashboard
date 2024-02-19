import {
  createCategory,
  createSubCategory,
  getCategories,
} from "@/actions/categories";
import SelectDropdown from "@/components/SelectDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoriesType } from "@/types/categories";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoReloadOutline } from "react-icons/io5";
import { useMutation, useQuery } from "react-query";

export default function Categories() {
  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery("categories", getCategories);
  const categoryMutute = useMutation(createCategory);
  const subCategoryMutute = useMutation(createSubCategory);
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [subCategoryValue, setSubCategoryValue] = useState<string>("");
  //create subcategories
  const subCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryId) return toast.error("select category first!");
    if (!subCategoryValue) return toast.error("write a sub-category first!");
    try {
      const res = await subCategoryMutute.mutateAsync({
        id: categoryId,
        name: subCategoryValue,
      });
      if (res?.success) {
        setSubCategoryValue("");
        toast.success("successfuly added!😊");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response
          ? error?.response?.data.error
          : error.message;

        toast.error(errorMessage);
      } else {
        console.log(error);
      }
    }
  };
  //create categories
  const categorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!categoryValue) return toast.error("write a category first!");
      const res = await categoryMutute.mutateAsync(categoryValue);
      if (res?.success) {
        setCategoryValue("");
        toast.success("successfuly added!😊");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response
          ? error?.response?.data.error
          : error.message;

        toast.error(errorMessage);
      } else {
        console.log(error);
      }
    }
  };
  if (isError) return <h1>something went wrong</h1>;
  if (isLoading) return <h1>loading...</h1>;
  return (
    <div>
      <h1 className="px-2 capitalize font-medium mt-8 text-lg text-blue-500">
        create category for new product -
      </h1>
      <div className="w-[40rem] border p-8 rounded-md my-8">
        <h1 className="capitalize font-medium ml-1 mb-1">
          create new category:
        </h1>
        <form className="flex" onSubmit={categorySubmit}>
          <Input
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
            placeholder="Add new category..."
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent"
          />
          <Button variant="primary" type="submit">
            {categoryMutute.isLoading ? (
              <>
                <IoReloadOutline className="mr-2 h-4 w-4 animate-spin" /> please
                wait
              </>
            ) : (
              "Add"
            )}
          </Button>
        </form>
      </div>
      <div className="w-[40rem] border p-8 rounded-md">
        <h1 className="capitalize font-medium ml-1 mb-1">
          create new sub-category:
        </h1>

        <form className="flex gap-x-1" onSubmit={subCategorySubmit}>
          <SelectDropdown
            categories={categories.data}
            onChange={(value: string) => {
              //set category id
              const categoryObj = categories?.data.find(
                (category: CategoriesType) => category.slug === value
              );
              setCategoryId(categoryObj._id);
            }}
          />
          <Input
            value={subCategoryValue}
            onChange={(e) => setSubCategoryValue(e.target.value)}
            placeholder="Add new sub-category..."
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent"
          />
          <Button variant="primary" type="submit">
            {subCategoryMutute.isLoading ? (
              <>
                <IoReloadOutline className="mr-2 h-4 w-4 animate-spin" /> please
                wait
              </>
            ) : (
              "Add"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
