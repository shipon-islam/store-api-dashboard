import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Routes/Routers";
import Headers from "./components/Headers";
import SideBar from "./components/SideBar";
import { isTokenExpired } from "./lib/jwtExpired";
import { getAuth } from "./lib/utilites";

export default function App() {
  const auth = getAuth();
  useEffect(() => {
    if (isTokenExpired(auth.token)) {
      localStorage.removeItem("session");
    }
  }, [auth]);
  return (
    <Router>
      <Headers />
      <main className="flex">
        <aside className="basis-[20rem] sticky top-14 h-full">
          <SideBar />
        </aside>
        <div className="basis-full px-4 py-4">{<Routers />}</div>
      </main>
    </Router>
  );
}
