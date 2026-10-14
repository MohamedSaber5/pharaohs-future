import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "@assets/images/logo.jpg";

const PROJECTS = [
  { id:1, name:"أبراج حورس الاستثمارية",   location:"العاصمة الإدارية", units:240, sold:78,  status:"تحت الإنشاء", delivery:"ديسمبر ٢٠٢٦" },
  { id:2, name:"كمبوند سيتيا",              location:"القاهرة الجديدة",  units:180, sold:102, status:"قيد البيع",    delivery:"يونيو ٢٠٢٧" },
  { id:3, name:"فيلات الملكية",             location:"الشيخ زايد",       units: 64, sold: 45, status:"قيد البيع",    delivery:"مارس ٢٠٢٦" },
  { id:4, name:"مشروع كيان السكني",         location:"الساحل الشمالي",  units:120, sold:120, status:"مكتمل",        delivery:"سبتمبر ٢٠٢٥" },
  { id:5, name:"بوابة القاهرة التجاري",     location:"مدينة نصر",        units: 96, sold: 32, status:"تحت الإنشاء", delivery:"أكتوبر ٢٠٢٧" },
  { id:6, name:"ريزيدنس بلو مار",           location:"رأس الحكمة",       units:200, sold: 88, status:"قيد البيع",    delivery:"فبراير ٢٠٢٦" },
];

const STATUS_COLORS = {
  "قيد البيع":    { bg:"#fef3c7", color:"#92400e" },
  "تحت الإنشاء": { bg:"#dbeafe", color:"#1e40af" },
  "مكتمل":        { bg:"#dcfce7", color:"#166534" },
};

const AdminProjectsPage = () => {
  const [search, setSearch]   = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = PROJECTS.filter(p => p.name.includes(search) || p.location.includes(search));

  return (
    <main style={{ minHeight:"100vh", background:"#f8f3e8", fontFamily:"Cairo, sans-serif", paddingTop:"72px" }}>
      <div className="site-container" style={{ paddingTop:"2rem", paddingBottom:"3rem" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <Link to="/admin/dashboard" style={{ fontSize:"0.8rem", color:"#c9952a", textDecoration:"none", marginBottom:"0.5rem", display:"block" }}>← لوحة التحكم</Link>
            <h1 style={{ fontSize:"1.6rem", fontWeight:"800", color:"#1c1917" }}>إدارة المشروعات</h1>
          </div>
          <button className="btn-gold" onClick={() => setShowModal(true)}>+ إضافة مشروع جديد</button>
        </div>

        {/* Search & Summary */}
        <div style={{ display:"flex", gap:"1rem", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap" }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 ابحث عن مشروع..."
            style={{ flex:1, minWidth:"220px", padding:"0.65rem 1rem", border:"1.5px solid #e6d9be", borderRadius:"8px", fontFamily:"Cairo,sans-serif", fontSize:"0.9rem", background:"#fff", outline:"none" }}
          />
          <span style={{ fontSize:"0.82rem", color:"#a8a29e" }}>{filtered.length} مشروع</span>
        </div>

        {/* Stats Summary */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginBottom:"2rem" }}>
          {[
            { label:"إجمالي المشروعات", value:PROJECTS.length },
            { label:"قيد البيع",        value:PROJECTS.filter(p=>p.status==="قيد البيع").length },
            { label:"تحت الإنشاء",      value:PROJECTS.filter(p=>p.status==="تحت الإنشاء").length },
            { label:"مكتملة",           value:PROJECTS.filter(p=>p.status==="مكتمل").length },
          ].map(s => (
            <div key={s.label} style={{ background:"#fff", borderRadius:"10px", padding:"1.1rem", border:"1px solid #e6d9be", textAlign:"center" }}>
              <p style={{ fontSize:"1.5rem", fontWeight:"800", color:"#1c1917" }}>{s.value}</p>
              <p style={{ fontSize:"0.78rem", color:"#78716c" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Projects Table */}
        <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e6d9be", overflow:"hidden" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"#fafaf9" }}>
                {["المشروع","الموقع","الوحدات","المباعة","نسبة البيع","الحالة","التسليم","إجراءات"].map(h => (
                  <th key={h} style={{ padding:"0.85rem 1rem", fontSize:"0.78rem", color:"#78716c", fontWeight:"600", textAlign:"right", borderBottom:"1px solid #e6d9be" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const pct = Math.round((p.sold/p.units)*100);
                const sc  = STATUS_COLORS[p.status];
                return (
                  <tr key={p.id} style={{ borderBottom:"1px solid #f8f4ed", transition:"background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background="#fdfaf5"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"1rem", display:"flex", alignItems:"center", gap:"0.75rem" }}>
                      <div style={{ width:"36px", height:"36px", borderRadius:"8px", background:"#f0ebe0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <img src={logoImg} alt="" style={{ width:"28px", opacity:0.4 }} />
                      </div>
                      <span style={{ fontSize:"0.88rem", fontWeight:"600", color:"#1c1917" }}>{p.name}</span>
                    </td>
                    <td style={{ padding:"1rem", fontSize:"0.82rem", color:"#78716c" }}>{p.location}</td>
                    <td style={{ padding:"1rem", fontSize:"0.88rem", fontWeight:"600", color:"#1c1917" }}>{p.units}</td>
                    <td style={{ padding:"1rem", fontSize:"0.88rem", color:"#57534e" }}>{p.sold}</td>
                    <td style={{ padding:"1rem" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                        <div style={{ flex:1, height:"6px", background:"#f0ebe0", borderRadius:"3px", overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${pct}%`, background:"#c9952a", borderRadius:"3px", transition:"width 0.5s" }} />
                        </div>
                        <span style={{ fontSize:"0.78rem", color:"#78716c", minWidth:"30px" }}>{pct}٪</span>
                      </div>
                    </td>
                    <td style={{ padding:"1rem" }}>
                      <span style={{ padding:"0.25rem 0.75rem", borderRadius:"999px", fontSize:"0.72rem", fontWeight:"700", background:sc.bg, color:sc.color }}>{p.status}</span>
                    </td>
                    <td style={{ padding:"1rem", fontSize:"0.82rem", color:"#57534e" }}>{p.delivery}</td>
                    <td style={{ padding:"1rem" }}>
                      <div style={{ display:"flex", gap:"0.5rem" }}>
                        <Link to={`/projects/${p.id}`} style={{ padding:"0.35rem 0.75rem", fontSize:"0.78rem", background:"#f0ebe0", color:"#57534e", border:"none", borderRadius:"6px", cursor:"pointer", textDecoration:"none", fontFamily:"Cairo,sans-serif" }}>عرض</Link>
                        <button style={{ padding:"0.35rem 0.75rem", fontSize:"0.78rem", background:"#fef3c7", color:"#92400e", border:"none", borderRadius:"6px", cursor:"pointer", fontFamily:"Cairo,sans-serif" }}>تعديل</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:"1rem" }}>
          <div style={{ background:"#fff", borderRadius:"16px", padding:"2rem", width:"100%", maxWidth:"500px", boxShadow:"0 25px 50px rgba(0,0,0,0.2)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
              <h2 style={{ fontSize:"1.2rem", fontWeight:"700", color:"#1c1917" }}>إضافة مشروع جديد</h2>
              <button onClick={() => setShowModal(false)} style={{ background:"none", border:"none", fontSize:"1.5rem", cursor:"pointer", color:"#78716c" }}>✕</button>
            </div>
            {[["اسم المشروع","text","project-name"],["الموقع","text","project-location"],["عدد الوحدات","number","project-units"],["موعد التسليم","text","project-delivery"]].map(([label,type,id]) => (
              <div key={id} style={{ marginBottom:"1rem" }}>
                <label style={{ display:"block", fontSize:"0.82rem", color:"#57534e", marginBottom:"0.35rem", fontWeight:"600" }}>{label}</label>
                <input id={id} type={type} style={{ width:"100%", padding:"0.65rem 0.9rem", border:"1.5px solid #e6d9be", borderRadius:"8px", fontFamily:"Cairo,sans-serif", fontSize:"0.875rem", boxSizing:"border-box" }} />
              </div>
            ))}
            <div style={{ display:"flex", gap:"0.75rem", marginTop:"1.5rem" }}>
              <button className="btn-gold" style={{ flex:1, justifyContent:"center" }}>إضافة المشروع</button>
              <button onClick={() => setShowModal(false)} className="btn-outline-gold" style={{ flex:1, justifyContent:"center" }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          main .site-container > div[style*="repeat(4,1fr)"] { grid-template-columns:1fr 1fr !important; }
          table { font-size:0.78rem !important; }
        }
        @media(max-width:600px){
          table th:nth-child(n+5), table td:nth-child(n+5) { display:none; }
        }
      `}</style>
    </main>
  );
};

export default AdminProjectsPage;
