import { loginUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoReloadOutline } from "react-icons/io5";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync, isLoading } = useMutation(loginUser);
  const navigate = useNavigate();
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await mutateAsync(values);
      if (res) {
        localStorage.setItem("auth", JSON.stringify(res.auth));
        toast.success("successfuly login!😊");
        navigate("/");
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[30rem] mx-auto mt-8 border p-10 rounded-md"
      >
        <h1 className="capitalize text-center font-medium">admin login</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="primary" type="submit" className="ml-auto block">
          {isLoading ? (
            <>
              <IoReloadOutline className="mr-2 h-4 w-4 animate-spin" /> please
              wait
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
