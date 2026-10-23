import { Outlet } from "react-router-dom";
import Navbar from "@components/layout/Navbar.jsx";
import Footer from "@components/layout/Footer.jsx";

/**
 * MainLayout — يغلّف كل الصفحات بالـ Navbar والـ Footer
 * يضيف padding-top لتعويض الـ Navbar الثابت (72px)
 */
const MainLayout = () => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8f3e8" }}>
    <Navbar />
    <div style={{ paddingTop: "72px", flex: 1 }} className="pb-20 lg:pb-0">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default MainLayout;
