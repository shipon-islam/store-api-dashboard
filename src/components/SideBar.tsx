"use client";
import { BiSolidMessage } from "react-icons/bi";
import { FaFolder, FaShoppingBasket } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { IoMdPricetag } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdReport } from "react-icons/md";
import { PiShieldStarFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
function SideBar() {
  const { pathname: path } = useLocation();

  return (
    <div className="bg-background basis-[10rem]">
      <ul className="ml-5 space-y-4 pt-8">
        <li className={`sidebar-li ${path === "/" && "active"}`}>
          <Link className="sidebar-a" to="/">
            <LuLayoutDashboard className=" text-xl" />
            overview
          </Link>
        </li>
        <li className={`sidebar-li ${path === "/orders" && "active"}`}>
          <Link className="sidebar-a" to="/orders">
            <FaShoppingBasket className=" text-xl" />
            orders
          </Link>
        </li>
        <li className={`sidebar-li ${path === "/products" && "active"}`}>
          <Link className="sidebar-a" to="/products">
            <IoMdPricetag className=" text-2xl" />
            products
          </Link>
        </li>
        <li className={`sidebar-li ${path === "/categories" && "active"}`}>
          <Link className="sidebar-a" to="/categories">
            <FaFolder className=" text-xl" />
            categories
          </Link>
        </li>
        <li className={`sidebar-li ${path === "/customers" && "active"}`}>
          <Link className="sidebar-a" to="/customers">
            <HiMiniUsers className=" text-2xl" />
            customers
          </Link>
        </li>
        <li className={`sidebar-li ${path === "/reports" && "active"}`}>
          <Link className="sidebar-a" to="/reports">
            <MdReport className=" text-2xl" />
            reports
          </Link>
        </li>
        <li className={`sidebar-li ${path === "/coupons" && "active"}`}>
          <Link className="sidebar-a" to="/coupons">
            <PiShieldStarFill className=" text-2xl" />
            coupons
          </Link>
        </li>
        <li className={`sidebar-li ${path === "/inbox" && "active"}`}>
          <Link className="sidebar-a" to="/">
            <BiSolidMessage className=" text-xl" />
            inbox
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
