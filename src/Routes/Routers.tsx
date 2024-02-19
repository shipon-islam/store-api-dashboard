import AddProduct from "@/pages/AddProduct";
import Categories from "@/pages/Categories";
import Coupons from "@/pages/Coupons";
import Customers from "@/pages/Customers";
import Inbox from "@/pages/Inbox";
import Login from "@/pages/Login";
import Orders from "@/pages/Orders";
import Overview from "@/pages/Overview";
import Products from "@/pages/Products";
import Reports from "@/pages/Reports";
import UpdateProduct from "@/pages/UpdateProduct";
import { Route, Routes } from "react-router-dom";
import ProtectRoutes from "./ProtectRoutes";

export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ProtectRoutes />}>
        <Route path="" element={<Overview />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="products/:id" element={<UpdateProduct />} />
        <Route path="categories" element={<Categories />} />
        <Route path="customers" element={<Customers />} />
        <Route path="reports" element={<Reports />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="inbox" element={<Inbox />} />
      </Route>
    </Routes>
  );
}
