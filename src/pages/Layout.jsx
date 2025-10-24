import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
