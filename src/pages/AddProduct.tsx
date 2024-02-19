import { getCategories } from "@/actions/categories";
import { addProductAction } from "@/actions/products";
import ReactQuillTextEditor from "@/components/ReactQuilTextEditor";
import SelectDropdown from "@/components/SelectDropdown";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addProductSchema } from "@/schema/addProductSchema";
import { CategoriesType } from "@/types/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaBackwardStep } from "react-icons/fa6";
import { IoReloadOutline } from "react-icons/io5";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { z } from "zod";

export default function AddProduct() {
  const { data: categories } = useQuery("categories", getCategories);
  const { mutateAsync, isLoading } = useMutation(addProductAction);
  const [subcategies, setSubcategies] = useState([]);
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
  });
  async function onSubmit(values: z.infer<typeof addProductSchema>) {
    try {
      const res = await mutateAsync(values);
      if (res.success) {
        toast.success("successfully added");
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
  }

  return (
    <>
      <Button variant="outline" className="flex gap-x-1 my-4 ml-12">
        <FaBackwardStep />
        <Link to="/products">product</Link>
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-[60rem] mx-auto border-2 p-10 rounded-md"
        >
          <div className="grid grid-cols-2 gap-4 pb-4">
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="category"
                render={() => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        onChange={(value) => {
                          form.setValue("category", value);
                          const categoryObj = categories?.data.find(
                            (category: CategoriesType) =>
                              category.slug === value
                          );
                          setSubcategies(categoryObj?.subcategory);
                        }}
                        categories={categories?.data || []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subcategory"
                render={() => (
                  <FormItem>
                    <FormLabel>Sub-category</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        onChange={(value) =>
                          form.setValue("subcategory", value)
                        }
                        categories={subcategies}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="price..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock ?</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="stock..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount ?</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="discount..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="cover"
              render={() => (
                <FormItem>
                  <FormLabel>Cover</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => form.setValue("cover", e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feature"
              render={() => (
                <FormItem>
                  <FormLabel>Feature</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      onChange={(e) => form.setValue("feature", e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={() => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <ReactQuillTextEditor
                    onChange={(value) => form.setValue("description", value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-5" variant="primary" type="submit">
            {isLoading ? (
              <>
                <IoReloadOutline className="mr-2 h-4 w-4 animate-spin" /> please
                wait
              </>
            ) : (
              "submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
