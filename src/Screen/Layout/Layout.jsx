/* eslint-disable react/prop-types */
import Footer from "../../Component/Footer/Footer";
import Navbar from "../../Component/Navbar/Navbar";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};
