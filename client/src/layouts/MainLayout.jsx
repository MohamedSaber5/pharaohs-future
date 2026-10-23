import { Outlet } from "react-router-dom";
import { useLanguage } from "@context/LanguageContext.jsx";
import Navbar from "@components/layout/Navbar.jsx";
import Footer from "@components/layout/Footer.jsx";

/**
 * MainLayout — يغلّف كل الصفحات بالـ Navbar والـ Footer مع دعم اللغتين والاتجاه
 */
const MainLayout = () => {
  const { dir } = useLanguage();

  return (
    <div dir={dir} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8f3e8" }}>
      <Navbar />
      <div style={{ paddingTop: "72px", flex: 1 }} className="pb-20 lg:pb-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
