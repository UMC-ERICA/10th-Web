import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Modal from "../components/Modal";
import { useModalInfo } from "../hooks/useModalStore";

const Layout = () => {
  const { isOpen: isModalOpen } = useModalInfo();

  return (
    <div>
      <Navbar />
      {isModalOpen && <Modal />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
