import { Footer } from "../Other/Footer";
import { Header } from "..//Other/Header";
import { Outlet } from "react-router-dom";

export const LayoutDefault = () => {
  return (
    <>
   
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
