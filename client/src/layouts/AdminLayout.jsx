import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";
import logoImg from "@assets/images/logo.jpg";

const NAV_ITEMS = [
  { to:"/admin/dashboard", icon:"📊", label:"لوحة التحكم" },
  { to:"/admin/projects",  icon:"🏗", label:"المشروعات" },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try { await logout(); } catch (_) {}
    navigate("/auth");
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"Cairo, sans-serif" }}>
      {/* ─── Sidebar ─── */}
      <aside style={{ width:"240px", background:"linear-gradient(180deg,#1c1917 0%,#2d2520 100%)", display:"flex", flexDirection:"column", flexShrink:0, position:"fixed", top:0, right:0, bottom:0, zIndex:50 }}>
        <div style={{ padding:"1.5rem", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:"0.75rem", textDecoration:"none" }}>
            <img src={logoImg} alt="" style={{ height:"36px", filter:"brightness(0) invert(1)", opacity:0.85 }} />
          </Link>
          <p style={{ fontSize:"0.72rem", color:"#a8a29e", marginTop:"0.5rem" }}>لوحة الإدارة</p>
        </div>

        <nav style={{ padding:"1rem 0.75rem", flex:1 }}>
          {NAV_ITEMS.map(item => (
            <NavLink key={item.to} to={item.to}
              style={({ isActive }) => ({
                display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.7rem 0.9rem", borderRadius:"8px", marginBottom:"0.25rem", textDecoration:"none", fontSize:"0.88rem", fontWeight:"600", transition:"all 0.2s",
                background: isActive ? "rgba(201,149,42,0.15)" : "transparent",
                color: isActive ? "#c9952a" : "#a8a29e",
              })}>
              <span>{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding:"1rem 0.75rem", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.75rem 0.5rem", marginBottom:"0.5rem" }}>
            <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:"#c9952a", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.85rem", color:"#fff", fontWeight:"700", flexShrink:0 }}>
              {user?.name?.[0] || "م"}
            </div>
            <div style={{ flex:1, overflow:"hidden" }}>
              <p style={{ fontSize:"0.82rem", fontWeight:"700", color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name || "المدير"}</p>
              <p style={{ fontSize:"0.7rem", color:"#78716c" }}>مدير النظام</p>
            </div>
          </div>
          <button onClick={handleLogout}
            style={{ width:"100%", padding:"0.6rem", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"8px", color:"#a8a29e", fontSize:"0.82rem", cursor:"pointer", fontFamily:"Cairo,sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(220,38,38,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.05)"}>
            🚪 تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <div style={{ marginRight:"240px", flex:1, minWidth:0 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
