import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import logoImg from "@assets/images/logo.jpg";

const UNIT = {
  type:"بنتهاوس فاخر ٤ غرف نوم", project:"أبراج حورس الاستثمارية", location:"العاصمة الإدارية — R7", floor:38, area:420, price:"٩٬٥٠٠٬٠٠٠",
  status:"متاح", finishing:"تشطيب فندقي كامل", rooms:4, bathrooms:4, parking:2, view:"بانورامي ٣٦٠°",
  description:"وحدة بنتهاوس استثنائية تقع في الطابق الثامن والثلاثين من أبراج حورس الاستثمارية، تتمتع بإطلالة بانورامية ٣٦٠ درجة على العاصمة الإدارية الجديدة. مساحة شاسعة بتصميم مفتوح وتشطيبات فندقية بمواصفات عالمية.",
  features:["إطلالة بانورامية ٣٦٠°","تراس خارجي ٨٠ م²","حوض سباحة خاص","مطبخ أمريكي مجهز بالكامل","غرفة خادمة مستقلة","مخزن ملابس واسع","نظام تكييف مركزي","نظام المنزل الذكي"],
  paymentPlan:{ downPayment:"٢٠٪ (١٬٩٠٠٬٠٠٠ ج.م)", installment:"٨٪ سنوياً على ٨ سنوات", maintenance:"٨٪ من قيمة الوحدة" },
};

const UnitDetailPage = () => {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState(0);
  const images = [0,1,2,3];

  return (
    <main style={{ backgroundColor:"#f8f3e8", minHeight:"100vh", paddingTop:"72px", fontFamily:"Cairo, sans-serif" }}>
      <div className="site-container" style={{ padding:"2rem 1.5rem" }}>
        <Link to="/properties" style={{ fontSize:"0.82rem", color:"#c9952a", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"0.3rem", marginBottom:"1.5rem" }}>
          → العودة للوحدات
        </Link>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:"2.5rem" }}>
          {/* ─── Left: Images + Details ─── */}
          <div>
            {/* Main Image */}
            <div style={{ borderRadius:"12px", overflow:"hidden", background:"#ede8de", aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0.75rem" }}>
              <img src={logoImg} alt={UNIT.type} style={{ maxHeight:"240px", objectFit:"contain", opacity:0.35 }} />
            </div>
            {/* Thumbnails */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0.5rem", marginBottom:"2rem" }}>
              {images.map(i => (
                <div key={i} onClick={() => setActiveImg(i)}
                  style={{ borderRadius:"8px", aspectRatio:"4/3", background:"#ede8de", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", border: activeImg===i ? "2.5px solid #c9952a" : "2.5px solid transparent", overflow:"hidden" }}>
                  <img src={logoImg} alt="" style={{ width:"60%", opacity:0.3, objectFit:"contain" }} />
                </div>
              ))}
            </div>

            {/* Specs */}
            <h2 style={{ fontSize:"1.2rem", fontWeight:"700", color:"#1c1917", marginBottom:"1rem" }}>مواصفات الوحدة</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0.75rem", marginBottom:"2rem" }}>
              {[["غرف النوم",UNIT.rooms,"🛏"],["الحمامات",UNIT.bathrooms,"🛁"],["المساحة",UNIT.area+" م²","📐"],["مواقف السيارات",UNIT.parking,"🚗"]].map(([l,v,i]) => (
                <div key={l} style={{ background:"#fff", borderRadius:"10px", padding:"1rem", border:"1px solid #e6d9be", textAlign:"center" }}>
                  <p style={{ fontSize:"1.5rem", marginBottom:"0.25rem" }}>{i}</p>
                  <p style={{ fontSize:"1rem", fontWeight:"800", color:"#1c1917" }}>{v}</p>
                  <p style={{ fontSize:"0.75rem", color:"#78716c" }}>{l}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize:"0.9rem", color:"#57534e", lineHeight:"2", marginBottom:"2rem" }}>{UNIT.description}</p>

            {/* Features */}
            <h2 style={{ fontSize:"1.1rem", fontWeight:"700", color:"#1c1917", marginBottom:"1rem" }}>المميزات والخصائص</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
              {UNIT.features.map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.85rem", color:"#44403c" }}>
                  <span style={{ color:"#c9952a", flexShrink:0 }}>✓</span> {f}
                </div>
              ))}
            </div>
          </div>

          {/* ─── Right: Price + Contact ─── */}
          <div style={{ position:"sticky", top:"100px", height:"fit-content" }}>
            <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e6d9be", overflow:"hidden", marginBottom:"1rem" }}>
              <div style={{ background:"linear-gradient(135deg,#1c1917,#2d2520)", padding:"1.5rem" }}>
                <p style={{ fontSize:"0.8rem", color:"#a8a29e", marginBottom:"0.25rem" }}>{UNIT.project}</p>
                <h2 style={{ fontSize:"1.2rem", fontWeight:"800", color:"#fff", marginBottom:"0.5rem" }}>{UNIT.type}</h2>
                <div style={{ display:"flex", alignItems:"baseline", gap:"0.35rem" }}>
                  <span style={{ fontSize:"1.6rem", fontWeight:"800", color:"#c9952a" }}>{UNIT.price}</span>
                  <span style={{ fontSize:"0.85rem", color:"#d6d3d1" }}>ج.م</span>
                </div>
              </div>
              <div style={{ padding:"1.5rem" }}>
                <h3 style={{ fontSize:"0.9rem", fontWeight:"700", color:"#1c1917", marginBottom:"0.75rem" }}>خطة السداد</h3>
                {Object.entries(UNIT.paymentPlan).map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"0.5rem 0", borderBottom:"1px solid #f0ebe0", fontSize:"0.82rem" }}>
                    <span style={{ color:"#78716c" }}>{k==="downPayment"?"مقدم الحجز":k==="installment"?"الأقساط":"صيانة"}</span>
                    <span style={{ fontWeight:"600", color:"#1c1917" }}>{v}</span>
                  </div>
                ))}
                <button className="btn-gold" style={{ width:"100%", justifyContent:"center", padding:"0.8rem", fontSize:"0.95rem", marginTop:"1.25rem" }}>احجز الوحدة الآن</button>
                <button className="btn-outline-gold" style={{ width:"100%", justifyContent:"center", padding:"0.7rem", fontSize:"0.85rem", marginTop:"0.5rem" }}>تواصل مع المبيعات</button>
              </div>
            </div>

            <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e6d9be", padding:"1.25rem" }}>
              <p style={{ fontSize:"0.82rem", fontWeight:"600", color:"#1c1917", marginBottom:"0.5rem" }}>📍 الموقع والمشروع</p>
              <p style={{ fontSize:"0.8rem", color:"#78716c" }}>{UNIT.location}</p>
              <p style={{ fontSize:"0.8rem", color:"#78716c" }}>الدور {UNIT.floor} · {UNIT.view}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          main > div.site-container > div[style*="grid-template-columns: 1fr 380px"] { grid-template-columns:1fr !important; }
          main > div.site-container > div > div > div[style*="repeat(4,1fr)"] { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
};

export default UnitDetailPage;
