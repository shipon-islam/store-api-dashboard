import { getProductById, updateProductAction } from "@/actions/products";
import ReactQuillTextEditor from "@/components/ReactQuilTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaBackwardStep } from "react-icons/fa6";
import { IoReloadOutline } from "react-icons/io5";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();
  const { data: product } = useQuery(["productbyid", id], () =>
    getProductById(id as string)
  );
  const [formData, setformData] = useState({
    name: product?.name,
    price: product?.price,
    stock: product?.stock,
    discount: product?.discount,
    description: product?.description,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cover: [] as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    feature: [] as any,
  });
  const { mutateAsync, isLoading } = useMutation(updateProductAction);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await mutateAsync({ ...formData, id });
      if (res.success) {
        toast.success("successfully updated");
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
      <form
        onSubmit={onSubmit}
        className=" w-[60rem] mx-auto border-2 p-10 rounded-md "
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="ml-1 mb-1 text-sm">Name</p>
            <Input defaultValue={product?.name} placeholder="name..." />
          </div>
          <div>
            <p className="ml-1 mb-1 text-sm">Price</p>
            <Input
              value={formData.price}
              onChange={(e) =>
                setformData((prev) => ({ ...prev, price: e.target.value }))
              }
              type="number"
              placeholder="price..."
            />
          </div>
          <div>
            <p className="ml-1 mb-1 text-sm">Stock</p>
            <Input
              value={formData.stock}
              onChange={(e) =>
                setformData((prev) => ({ ...prev, stock: e.target.value }))
              }
              type="number"
              placeholder="stock..."
            />
          </div>
          <div>
            <p className="ml-1 mb-1 text-sm">Discount</p>
            <Input
              value={formData.discount}
              onChange={(e) =>
                setformData((prev) => ({ ...prev, discount: e.target.value }))
              }
              type="number"
              placeholder="discount..."
            />
          </div>
          <div>
            <p className="ml-1 mb-1 text-sm">Cover</p>
            <Input
              type="file"
              onChange={(e) =>
                setformData((prev) => ({ ...prev, cover: e.target.files }))
              }
            />
          </div>
          <div>
            <p className="ml-1 mb-1 text-sm">Stock</p>
            <Input
              type="file"
              multiple
              onChange={(e) =>
                setformData((prev) => ({ ...prev, feature: e.target.files }))
              }
            />
          </div>
        </div>
        <p className="ml-1 mb-1 text-sm mt-4">Description</p>
        <ReactQuillTextEditor
          defaultValue={formData.description}
          onChange={(value) => {
            setformData((prev) => ({ ...prev, description: value }));
          }}
        />

        <Button className="mt-5" variant="primary" type="submit">
          {isLoading ? (
            <>
              <IoReloadOutline className="mr-2 h-4 w-4 animate-spin" /> please
              wait
            </>
          ) : (
            "update"
          )}
        </Button>
      </form>
    </>
  );
}
