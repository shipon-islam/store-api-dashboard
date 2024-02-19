import { getUserbyId } from "@/actions/users";
import { getAuth } from "@/lib/utilites";
import { ReactNode, createContext, useContext } from "react";
import { useQuery } from "react-query";
import { contextValue, contextValueType } from "./initailState";
const auth = getAuth();
const MainContext = createContext<contextValueType>(contextValue);
export const UseStore = () => useContext(MainContext);
export default function StoreProvider({ children }: { children: ReactNode }) {
  const { data: user } = useQuery(["auth", auth?.id], () =>
    getUserbyId(auth?.id)
  );
  const contextValue = {
    user,
  };
  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
}
