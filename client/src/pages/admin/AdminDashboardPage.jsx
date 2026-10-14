import { Link } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";

const STATS = [
  { label:"إجمالي المشروعات",  value:"٦",        sub:"مشروع نشط",          icon:"🏗", color:"#c9952a",  bg:"#fdf8ee" },
  { label:"الوحدات المتاحة",   value:"٢٤٨",      sub:"وحدة للبيع",          icon:"🏠", color:"#1d4ed8",  bg:"#dbeafe" },
  { label:"إجمالي المبيعات",   value:"٣٨٧م",     sub:"جنيه مصري",           icon:"💰", color:"#166534",  bg:"#dcfce7" },
  { label:"طلبات الاستفسار",   value:"١٢",       sub:"طلب جديد اليوم",       icon:"📋", color:"#9333ea",  bg:"#f3e8ff" },
];

const RECENT = [
  { name:"أحمد محمود السيد",   unit:"بنتهاوس - أبراج حورس",   date:"اليوم ٢:١٥م",   status:"جديد",    price:"٩٬٥٠٠٬٠٠٠" },
  { name:"سارة عبد الله",      unit:"شقة ٣ غرف - سيتيا",      date:"أمس ١١:٣٠ص",   status:"قيد المتابعة", price:"٥٬٢٠٠٬٠٠٠" },
  { name:"محمد إبراهيم",       unit:"فيلا مستقلة - الملكية",  date:"أمس ٩:٠٠ص",    status:"مكتمل",   price:"١٢٬٠٠٠٬٠٠٠" },
  { name:"ريم حسن",            unit:"شاليه - بلو مار",        date:"٢ أيام مضت",    status:"جديد",    price:"٤٬٨٠٠٬٠٠٠" },
];

const STATUS_STYLE = {
  "جديد":          { bg:"#dbeafe", color:"#1e40af" },
  "قيد المتابعة":  { bg:"#fef3c7", color:"#92400e" },
  "مكتمل":         { bg:"#dcfce7", color:"#166534" },
};

const AdminDashboardPage = () => {
  const { user } = useAuth();
  return (
    <main style={{ minHeight:"100vh", background:"#f8f3e8", fontFamily:"Cairo, sans-serif", paddingTop:"72px" }}>
      <div className="site-container" style={{ paddingTop:"2rem", paddingBottom:"3rem" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <h1 style={{ fontSize:"1.6rem", fontWeight:"800", color:"#1c1917", marginBottom:"0.25rem" }}>لوحة التحكم</h1>
            <p style={{ fontSize:"0.9rem", color:"#78716c" }}>مرحباً، {user?.name || "المدير"} — إليك ملخص اليوم</p>
          </div>
          <Link to="/admin/projects" className="btn-gold" style={{ fontSize:"0.85rem" }}>إدارة المشروعات</Link>
        </div>

        {/* Stats Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.25rem", marginBottom:"2rem" }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background:"#fff", borderRadius:"12px", padding:"1.5rem", border:"1px solid #e6d9be" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <p style={{ fontSize:"0.78rem", color:"#78716c", marginBottom:"0.5rem" }}>{s.label}</p>
                  <p style={{ fontSize:"1.7rem", fontWeight:"800", color:"#1c1917", lineHeight:1 }}>{s.value}</p>
                  <p style={{ fontSize:"0.75rem", color:"#a8a29e", marginTop:"0.25rem" }}>{s.sub}</p>
                </div>
                <div style={{ width:"44px", height:"44px", borderRadius:"10px", background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" }}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:"1.5rem" }}>
          {/* Recent Inquiries */}
          <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e6d9be", overflow:"hidden" }}>
            <div style={{ padding:"1.25rem 1.5rem", borderBottom:"1px solid #e6d9be", display:"flex", justifyContent:"space-between" }}>
              <h2 style={{ fontSize:"1rem", fontWeight:"700", color:"#1c1917" }}>آخر الاستفسارات</h2>
              <span style={{ fontSize:"0.82rem", color:"#c9952a", cursor:"pointer" }}>عرض الكل</span>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#fafaf9" }}>
                  {["العميل","الوحدة","الوقت","الحالة","القيمة"].map(h => (
                    <th key={h} style={{ padding:"0.75rem 1rem", fontSize:"0.78rem", color:"#78716c", fontWeight:"600", textAlign:"right", borderBottom:"1px solid #f0ebe0" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT.map((r, i) => {
                  const ss = STATUS_STYLE[r.status];
                  return (
                    <tr key={i} style={{ borderBottom:"1px solid #f8f4ed" }}>
                      <td style={{ padding:"0.85rem 1rem", fontSize:"0.85rem", fontWeight:"600", color:"#1c1917" }}>{r.name}</td>
                      <td style={{ padding:"0.85rem 1rem", fontSize:"0.82rem", color:"#78716c" }}>{r.unit}</td>
                      <td style={{ padding:"0.85rem 1rem", fontSize:"0.78rem", color:"#a8a29e" }}>{r.date}</td>
                      <td style={{ padding:"0.85rem 1rem" }}>
                        <span style={{ padding:"0.2rem 0.7rem", borderRadius:"999px", fontSize:"0.72rem", fontWeight:"700", background:ss.bg, color:ss.color }}>{r.status}</span>
                      </td>
                      <td style={{ padding:"0.85rem 1rem", fontSize:"0.82rem", fontWeight:"700", color:"#1c1917", textAlign:"left" }}>{r.price} ج.م</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e6d9be", padding:"1.5rem" }}>
              <h2 style={{ fontSize:"1rem", fontWeight:"700", color:"#1c1917", marginBottom:"1rem" }}>إجراءات سريعة</h2>
              {[
                { label:"إضافة مشروع جديد",  icon:"➕", to:"/admin/projects" },
                { label:"إضافة وحدة جديدة",  icon:"🏠", to:"/admin/projects" },
                { label:"مراجعة الاستفسارات",icon:"📋", to:"/admin/projects" },
                { label:"إعدادات الموقع",     icon:"⚙", to:"/admin/projects" },
              ].map(a => (
                <Link key={a.label} to={a.to}
                  style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.75rem 0.5rem", borderBottom:"1px solid #f0ebe0", textDecoration:"none", fontSize:"0.88rem", color:"#44403c", transition:"color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color="#c9952a"}
                  onMouseLeave={e => e.currentTarget.style.color="#44403c"}>
                  <span>{a.icon}</span> {a.label}
                </Link>
              ))}
            </div>

            <div style={{ background:"linear-gradient(135deg,#1c1917,#2d2520)", borderRadius:"12px", padding:"1.5rem", color:"#fff" }}>
              <p style={{ fontSize:"0.78rem", color:"#c9952a", marginBottom:"0.5rem" }}>نصيحة اليوم</p>
              <p style={{ fontSize:"0.88rem", lineHeight:"1.8", color:"#d6d3d1" }}>تابع الاستفسارات الجديدة بسرعة — الرد خلال الساعة الأولى يزيد فرص الإغلاق بنسبة ٣ أضعاف.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){
          main .site-container > div[style*="repeat(4,1fr)"] { grid-template-columns:1fr 1fr !important; }
          main .site-container > div[style*="2fr 1fr"] { grid-template-columns:1fr !important; }
        }
        @media(max-width:600px){
          main .site-container > div[style*="repeat(4,1fr)"] { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
};

export default AdminDashboardPage;
