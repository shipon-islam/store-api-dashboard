import { deleteUserbyId, getUsers } from "@/actions/users";
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
import { UserType } from "@/types/users";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Customers() {
  const { data: users, refetch } = useQuery("users", getUsers);
  const deleteUserMutute = useMutation(deleteUserbyId);
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUserMutute.mutateAsync(id);
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
  return (
    <div>
      <Table>
        <TableCaption>A list of products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px] uppercase">#id</TableHead>
            <TableHead className="uppercase">image</TableHead>
            <TableHead className="uppercase">name</TableHead>
            <TableHead className=" uppercase">email</TableHead>
            <TableHead className=" uppercase">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: UserType) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                #{user._id.slice(-2)}
              </TableCell>
              <TableCell>
                <img
                  className="w-14 h-auto rounded-md"
                  src={user.avatar}
                  alt="user"
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="">{user.email}</TableCell>

              <TableCell className="flex gap-x-1">
                <Button size="sm" variant="primary">
                  <Link to={`/customer/${user._id}`}>
                    <FaEdit />
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(user._id)}
                >
                  <MdDelete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
