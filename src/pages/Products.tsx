import { getCategories } from "@/actions/categories";
import { deleteProductById, getProducts } from "@/actions/products";
import PaginateArea from "@/components/PaginateArea";
import SelectDropdown from "@/components/SelectDropdown";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { productType } from "@/types/prouduct";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { Link, useLocation, useSearchParams } from "react-router-dom";
function useSearchQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Products() {
  const searchQuery = useSearchQuery();
  const [, setSearchParams] = useSearchParams();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery(["products", searchQuery], () => getProducts(searchQuery));
  const { data: categories } = useQuery("categories", getCategories);
  const deleteProductMutute = useMutation(deleteProductById);
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProductMutute.mutateAsync(id);
      if (res.success) {
        toast.success("successfuly deleted!😊");
        refetch();
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
  useEffect(() => {
    refetch();
  }, [refetch, searchQuery]);

  if (isLoading) return <h1>Product is Fetching...</h1>;
  return (
    <div>
      <div className="flex justify-between px-8 pb-4">
        <div className="flex gap-x-2 items-center">
          <p>Filter</p>
          {categories && (
            <SelectDropdown
              onChange={(e) => {
                setSearchParams({ category: e });
              }}
              categories={categories?.data}
            />
          )}
        </div>
        <Button variant="outline" className="flex gap-x-1">
          <FaPlus />
          <Link to="/add-product">Add product</Link>
        </Button>
      </div>

      <Table>
        <TableCaption>A list of products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px] uppercase">#id</TableHead>
            <TableHead className="uppercase">image</TableHead>
            <TableHead className="uppercase">name</TableHead>
            <TableHead className=" uppercase">category</TableHead>
            <TableHead className=" uppercase">sub-category</TableHead>
            <TableHead className=" uppercase">price</TableHead>
            <TableHead className=" uppercase">rating</TableHead>
            <TableHead className=" uppercase">discount</TableHead>
            <TableHead className=" uppercase">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.data.map((product: productType) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">
                #{product._id.slice(-2)}
              </TableCell>
              <TableCell>
                <img
                  className="w-14 h-auto rounded-md"
                  src={product.cover}
                  alt="product"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="">{product.category}</TableCell>
              <TableCell className="">{product.subcategory}</TableCell>
              <TableCell className="">${product.price}</TableCell>
              <TableCell className="">{product.rating}</TableCell>
              <TableCell className="">{product.discount}%</TableCell>
              <TableCell className="flex gap-x-1">
                <Button size="sm" variant="primary">
                  <Link to={`/products/${product._id}`}>
                    <FaEdit />
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(product._id)}
                >
                  <MdDelete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginateArea paginate={products?.pagination} />
    </div>
  );
}
