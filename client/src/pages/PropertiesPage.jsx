import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "@assets/images/logo.jpg";

const UNITS = [
  { id:1, type:"شقة فاخرة ٣ غرف",  project:"أبراج حورس",   location:"العاصمة الإدارية", area:210, floor:18, price:"٥٬٢٠٠٬٠٠٠", status:"متاح",    finishing:"سوبر لوكس" },
  { id:2, type:"بنتهاوس",           project:"سيتيا",         location:"القاهرة الجديدة", area:380, floor:24, price:"٩٬٥٠٠٬٠٠٠", status:"محجوز",   finishing:"تشطيب فندقي" },
  { id:3, type:"شقة ٢ غرف نوم",    project:"الملكية",       location:"الشيخ زايد",       area:145, floor: 7, price:"٣٬١٠٠٬٠٠٠", status:"متاح",    finishing:"نصف تشطيب" },
  { id:4, type:"فيلا مستقلة",       project:"كيان",          location:"الساحل الشمالي",  area:520, floor: 1, price:"١٢٬٠٠٠٬٠٠٠",status:"متاح",    finishing:"سوبر لوكس" },
  { id:5, type:"شقة ٣ غرف نوم",    project:"بلو مار",       location:"رأس الحكمة",       area:190, floor: 6, price:"٤٬٨٠٠٬٠٠٠", status:"متاح",    finishing:"فندقي" },
  { id:6, type:"دوبلكس",           project:"بوابة القاهرة", location:"مدينة نصر",        area:260, floor:12, price:"٦٬٤٠٠٬٠٠٠", status:"محجوز",   finishing:"سوبر لوكس" },
];

const STATUS_COLORS = { "متاح": { bg:"#dcfce7",color:"#166534" }, "محجوز": { bg:"#fee2e2",color:"#991b1b" } };

const UnitCard = ({ unit }) => {
  const sc = STATUS_COLORS[unit.status];
  return (
    <div className="property-card" style={{ background:"#fff", display:"flex", gap:"0" }}>
      <div style={{ width:"200px", minHeight:"160px", background:"#ede8de", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <img src={logoImg} alt={unit.type} style={{ width:"70%", opacity:0.35, objectFit:"contain" }} />
      </div>
      <div style={{ padding:"1.25rem", flex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.5rem" }}>
          <div>
            <p style={{ fontSize:"0.72rem", color:"#a8a29e" }}>{unit.project} · {unit.location}</p>
            <h3 style={{ fontSize:"1rem", fontWeight:"700", color:"#1c1917" }}>{unit.type}</h3>
          </div>
          <span style={{ padding:"0.25rem 0.8rem", borderRadius:"999px", fontSize:"0.72rem", fontWeight:"700", background:sc.bg, color:sc.color, whiteSpace:"nowrap" }}>{unit.status}</span>
        </div>
        <div style={{ display:"flex", gap:"1.5rem", marginBottom:"1rem", flexWrap:"wrap" }}>
          {[["📐",`${unit.area} م²`],["🏢",`الدور ${unit.floor}`],["✦",unit.finishing]].map(([icon,val]) => (
            <span key={val} style={{ fontSize:"0.8rem", color:"#57534e" }}>{icon} {val}</span>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ fontSize:"0.68rem", color:"#a8a29e" }}>السعر</p>
            <p style={{ fontSize:"1rem", fontWeight:"800", color:"#1c1917" }}>{unit.price} <span style={{ fontSize:"0.72rem", fontWeight:"400" }}>ج.م</span></p>
          </div>
          <Link to={`/properties/${unit.id}`} className="btn-gold" style={{ padding:"0.5rem 1.2rem", fontSize:"0.82rem" }}>تفاصيل الوحدة</Link>
        </div>
      </div>
    </div>
  );
};

const PropertiesPage = () => {
  const [typeFilter,  setTypeFilter]  = useState("الكل");
  const [statusFilter,setStatusFilter]= useState("الكل");
  const [sortBy,      setSortBy]      = useState("الأحدث");

  const filtered = UNITS.filter(u =>
    (typeFilter === "الكل" || u.type.includes(typeFilter)) &&
    (statusFilter === "الكل" || u.status === statusFilter)
  );

  return (
    <main style={{ backgroundColor:"#f8f3e8", minHeight:"100vh", paddingTop:"72px", fontFamily:"Cairo, sans-serif" }}>
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#1c1917 0%,#2d2520 100%)", padding:"4rem 0 3rem", textAlign:"center" }}>
        <div className="site-container">
          <span className="section-tag" style={{ color:"#c9952a", justifyContent:"center" }}>وحداتنا المتاحة</span>
          <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:"800", color:"#fff", marginBottom:"0.75rem" }}>الوحدات المتاحة</h1>
          <p style={{ fontSize:"0.95rem", color:"#a8a29e", maxWidth:"480px", margin:"0 auto" }}>تصفح مجموعة الوحدات الفاخرة المتاحة للبيع عبر جميع مشروعاتنا.</p>
        </div>
      </section>

      {/* Filters Bar */}
      <section style={{ background:"#fff", borderBottom:"1px solid #e6d9be", padding:"1rem 0", position:"sticky", top:"72px", zIndex:30 }}>
        <div className="site-container" style={{ display:"flex", gap:"1rem", alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:"0.5rem" }}>
            {["الكل","متاح","محجوز"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{ padding:"0.4rem 1rem", borderRadius:"999px", fontSize:"0.82rem", fontWeight:"600", border:"1.5px solid", cursor:"pointer", transition:"all 0.2s", background:statusFilter===s?"#c9952a":"transparent", color:statusFilter===s?"#fff":"#57534e", borderColor:statusFilter===s?"#c9952a":"#d6d3d1" }}>{s}</button>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ marginRight:"auto", padding:"0.4rem 0.8rem", border:"1.5px solid #e6d9be", borderRadius:"8px", fontFamily:"Cairo,sans-serif", fontSize:"0.82rem", background:"#f8f3e8", cursor:"pointer" }}>
            {["الأحدث","السعر: الأقل أولاً","المساحة: الأكبر أولاً"].map(o => <option key={o}>{o}</option>)}
          </select>
          <span style={{ fontSize:"0.82rem", color:"#a8a29e" }}>{filtered.length} وحدة</span>
        </div>
      </section>

      {/* Units List */}
      <section style={{ padding:"3rem 0" }}>
        <div className="site-container" style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
          {filtered.map(u => <UnitCard key={u.id} unit={u} />)}
        </div>
      </section>

      <style>{`
        @media(max-width:700px){
          .property-card { flex-direction:column !important; }
          .property-card > div:first-child { width:100% !important; height:200px; }
        }
      `}</style>
    </main>
  );
};

export default PropertiesPage;
