import { getAuth } from "@/lib/utilites";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectRoutes() {
  const auth = getAuth();
  return auth?.token && auth?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
