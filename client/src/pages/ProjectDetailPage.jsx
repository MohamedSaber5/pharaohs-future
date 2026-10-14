import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import logoImg from "@assets/images/logo.jpg";

const PROJECTS_DATA = {
  1: {
    name: "أبراج حورس الاستثمارية", location: "العاصمة الإدارية الجديدة — R7", status: "تحت الإنشاء", delivery: "ديسمبر ٢٠٢٦",
    description: "صرح استثماري فاخر يجمع بين الوحدات السكنية الراقية والمساحات التجارية المتكاملة في قلب العاصمة الإدارية الجديدة، بتصميم معماري يستوحي عظمة الحضارة الفرعونية بأسلوب عصري متميز.",
    area: "العاصمة الإدارية", totalArea: "٣٢٠٠٠ م²", floors: "٤٢ دور", units: 240, startPrice: "٣٬٨٠٠٬٠٠٠",
    amenities: ["حمام سباحة لا نهائي","صالة رياضية مجهزة","نادي اجتماعي فاخر","أمن وحراسة ٢٤/٧","مواقف سيارات متعددة الطوابق","مولد كهربائي احتياطي","مصاعد بانورامية","مناطق تجارية وخدمية"],
    unitTypes: [
      { type: "شقة ٢ غرفة نوم", area: "١٣٥–١٨٠ م²", price: "٣٬٨٠٠٬٠٠٠", available: 24 },
      { type: "شقة ٣ غرف نوم",  area: "١٩٠–٢٤٠ م²", price: "٥٬٢٠٠٬٠٠٠", available: 18 },
      { type: "بنتهاوس",        area: "٣٢٠–٤٨٠ م²", price: "٩٬٥٠٠٬٠٠٠", available:  8 },
    ],
  },
};

const DEFAULT = PROJECTS_DATA[1];

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = PROJECTS_DATA[id] || DEFAULT;
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [{ id:"overview",label:"نظرة عامة"},{ id:"units",label:"الوحدات المتاحة"},{ id:"amenities",label:"المرافق والخدمات"}];

  return (
    <main style={{ backgroundColor: "#f8f3e8", minHeight: "100vh", paddingTop: "72px", fontFamily: "Cairo, sans-serif" }}>
      {/* ─── Hero Image ─── */}
      <div style={{ height: "420px", background: "#1c1917", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={logoImg} alt={project.name} style={{ maxHeight: "240px", objectFit: "contain", opacity: 0.2 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(28,25,23,0.85) 0%,transparent 60%)" }} />
        <div className="site-container" style={{ position: "absolute", bottom: "2rem", right: 0, left: 0 }}>
          <Link to="/projects" style={{ fontSize: "0.82rem", color: "#c9952a", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.75rem" }}>
            → العودة للمشروعات
          </Link>
          <h1 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: "800", color: "#fff", marginBottom: "0.5rem" }}>{project.name}</h1>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#d6d3d1" }}>📍 {project.location}</span>
            <span style={{ padding: "0.25rem 0.8rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "700", background: "#dbeafe", color: "#1e40af" }}>{project.status}</span>
            <span style={{ fontSize: "0.85rem", color: "#d6d3d1" }}>🗓 تسليم {project.delivery}</span>
          </div>
        </div>
      </div>

      {/* ─── Stats Bar ─── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e6d9be" }}>
        <div className="site-container" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0" }}>
          {[
            { label: "إجمالي الوحدات", value: project.units },
            { label: "المساحة الإجمالية", value: project.totalArea },
            { label: "عدد الأدوار", value: project.floors },
            { label: "السعر يبدأ من", value: project.startPrice + " ج.م" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "1.5rem", textAlign: "center", borderRight: i < 3 ? "1px solid #e6d9be" : "none" }}>
              <p style={{ fontSize: "1.2rem", fontWeight: "800", color: "#1c1917", marginBottom: "0.2rem" }}>{s.value}</p>
              <p style={{ fontSize: "0.78rem", color: "#78716c" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Tabs ─── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e6d9be", position: "sticky", top: "72px", zIndex: 20 }}>
        <div className="site-container" style={{ display: "flex", gap: "0" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ padding: "1rem 1.5rem", fontSize: "0.9rem", fontWeight: "600", border: "none", background: "transparent", cursor: "pointer", borderBottom: activeTab===t.id ? "2.5px solid #c9952a" : "2.5px solid transparent", color: activeTab===t.id ? "#c9952a" : "#78716c", transition: "all 0.2s", fontFamily: "Cairo, sans-serif" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Tab Content ─── */}
      <section style={{ padding: "3rem 0" }}>
        <div className="site-container">
          {activeTab === "overview" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2.5rem" }}>
              <div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1c1917", marginBottom: "1rem" }}>عن المشروع</h2>
                <p style={{ fontSize: "0.92rem", color: "#57534e", lineHeight: "2", marginBottom: "2rem" }}>{project.description}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[["المنطقة", project.area],["المساحة الكلية", project.totalArea],["الأدوار", project.floors],["موعد التسليم", project.delivery]].map(([k,v]) => (
                    <div key={k} style={{ background: "#fff", borderRadius: "10px", padding: "1rem 1.25rem", border: "1px solid #e6d9be" }}>
                      <p style={{ fontSize: "0.75rem", color: "#a8a29e", marginBottom: "0.25rem" }}>{k}</p>
                      <p style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1c1917" }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e6d9be", height: "fit-content" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#1c1917", marginBottom: "1rem" }}>استفسر عن المشروع</h3>
                <input placeholder="اسمك الكامل" style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1px solid #e6d9be", borderRadius: "8px", marginBottom: "0.75rem", fontFamily: "Cairo,sans-serif", fontSize: "0.875rem", background: "#f8f3e8" }} />
                <input placeholder="رقم الهاتف" style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1px solid #e6d9be", borderRadius: "8px", marginBottom: "0.75rem", fontFamily: "Cairo,sans-serif", fontSize: "0.875rem", background: "#f8f3e8" }} />
                <select style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1px solid #e6d9be", borderRadius: "8px", marginBottom: "1rem", fontFamily: "Cairo,sans-serif", fontSize: "0.875rem", background: "#f8f3e8" }}>
                  <option>اختر نوع الوحدة</option>
                  {project.unitTypes.map(u => <option key={u.type}>{u.type}</option>)}
                </select>
                <button className="btn-gold" style={{ width: "100%", justifyContent: "center", padding: "0.75rem" }}>أرسل استفساراً</button>
                <p style={{ fontSize: "0.75rem", color: "#a8a29e", textAlign: "center", marginTop: "0.75rem" }}>سيتواصل معك مستشار مبيعات خلال ٢٤ ساعة</p>
              </div>
            </div>
          )}

          {activeTab === "units" && (
            <div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1c1917", marginBottom: "1.5rem" }}>الوحدات المتاحة</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {project.unitTypes.map(u => (
                  <div key={u.type} style={{ background: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e6d9be", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#1c1917", marginBottom: "0.3rem" }}>{u.type}</h3>
                      <p style={{ fontSize: "0.85rem", color: "#78716c" }}>المساحة: {u.area} · متاح: {u.available} وحدة</p>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <p style={{ fontSize: "0.75rem", color: "#a8a29e" }}>يبدأ من</p>
                      <p style={{ fontSize: "1.1rem", fontWeight: "800", color: "#1c1917" }}>{u.price} <span style={{ fontSize: "0.75rem", fontWeight: "400" }}>ج.م</span></p>
                    </div>
                    <Link to="/properties" className="btn-gold" style={{ padding: "0.55rem 1.3rem", fontSize: "0.85rem" }}>احجز الآن</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "amenities" && (
            <div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1c1917", marginBottom: "1.5rem" }}>المرافق والخدمات</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
                {project.amenities.map(a => (
                  <div key={a} style={{ background: "#fff", borderRadius: "10px", padding: "1.25rem", border: "1px solid #e6d9be", textAlign: "center" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#fdf8ee", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem", fontSize: "1.2rem" }}>✦</div>
                    <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1c1917" }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          main > section > .site-container > div[style*="grid-template-columns: 1fr 340px"] { grid-template-columns:1fr !important; }
          main > div[style*="grid-template-columns: repeat(4,1fr)"] { grid-template-columns:1fr 1fr !important; }
          main > section > .site-container > div[style*="repeat(4,1fr)"] { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
};

export default ProjectDetailPage;
