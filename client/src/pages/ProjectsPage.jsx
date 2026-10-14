import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "@assets/images/logo.jpg";

const PROJECTS = [
  { id: 1, name: "أبراج حورس الاستثمارية",   location: "العاصمة الإدارية الجديدة", type: "أبراج تجارية وسكنية", units: 240, startPrice: "٣٬٨٠٠٬٠٠٠", status: "تحت الإنشاء",   delivery: "٢٠٢٦" },
  { id: 2, name: "كمبوند سيتيا",              location: "القاهرة الجديدة — Golden Square", type: "كمبوند سكني فاخر", units: 180, startPrice: "٢٬٥٠٠٬٠٠٠", status: "قيد البيع",    delivery: "٢٠٢٧" },
  { id: 3, name: "فيلات الملكية",              location: "الشيخ زايد — حدائق الأهرام", type: "فيلات مستقلة",       units:  64, startPrice: "٧٬٢٠٠٬٠٠٠", status: "قيد البيع",    delivery: "٢٠٢٦" },
  { id: 4, name: "مشروع كيان السكني",         location: "مدينة الساحل الشمالي",      type: "شاليهات وفيلات",    units: 120, startPrice: "٤٬١٠٠٬٠٠٠", status: "مكتمل",        delivery: "٢٠٢٥" },
  { id: 5, name: "بوابة القاهرة التجاري",     location: "مدينة نصر — المنطقة التجارية", type: "مكاتب تجارية",    units:  96, startPrice: "١٬٩٠٠٬٠٠٠", status: "تحت الإنشاء", delivery: "٢٠٢٧" },
  { id: 6, name: "ريزيدنس بلو مار",           location: "رأس الحكمة — الساحل الشمالي", type: "شاليهات ساحلية",  units: 200, startPrice: "٣٬٣٠٠٬٠٠٠", status: "قيد البيع",    delivery: "٢٠٢٦" },
];

const STATUS_COLORS = {
  "قيد البيع":    { bg: "#fef3c7", color: "#92400e" },
  "تحت الإنشاء": { bg: "#dbeafe", color: "#1e40af" },
  "مكتمل":        { bg: "#dcfce7", color: "#166534" },
};

const ProjectCard = ({ project }) => {
  const sc = STATUS_COLORS[project.status] || { bg: "#f3f4f6", color: "#374151" };
  return (
    <div className="property-card" style={{ background: "#fff" }}>
      <div style={{ position: "relative", aspectRatio: "16/10", background: "#ede8de", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={logoImg} alt={project.name} style={{ width: "50%", objectFit: "contain", opacity: 0.35 }} />
        <span style={{ position: "absolute", top: "1rem", right: "1rem", padding: "0.3rem 0.85rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "700", background: sc.bg, color: sc.color }}>
          {project.status}
        </span>
      </div>
      <div style={{ padding: "1.25rem" }}>
        <p style={{ fontSize: "0.75rem", color: "#a8a29e", marginBottom: "0.25rem" }}>{project.location}</p>
        <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#1c1917", marginBottom: "0.4rem" }}>{project.name}</h3>
        <p style={{ fontSize: "0.8rem", color: "#78716c", marginBottom: "1rem" }}>{project.type} · {project.units} وحدة · تسليم {project.delivery}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to={`/projects/${project.id}`} style={{ fontSize: "0.82rem", fontWeight: "600", color: "#c9952a", textDecoration: "none" }}>
            تفاصيل المشروع ←
          </Link>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "0.68rem", color: "#a8a29e" }}>يبدأ من</p>
            <p style={{ fontSize: "0.92rem", fontWeight: "700", color: "#1c1917" }}>{project.startPrice} <span style={{ fontSize: "0.72rem", fontWeight: "400" }}>ج.م</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const filters = ["الكل", "قيد البيع", "تحت الإنشاء", "مكتمل"];
  const filtered = activeFilter === "الكل" ? PROJECTS : PROJECTS.filter(p => p.status === activeFilter);

  return (
    <main style={{ backgroundColor: "#f8f3e8", minHeight: "100vh", paddingTop: "72px", fontFamily: "Cairo, sans-serif" }}>
      {/* ─── Hero Banner ─── */}
      <section style={{ background: "linear-gradient(135deg,#1c1917 0%,#2d2520 100%)", padding: "4rem 0 3rem", textAlign: "center" }}>
        <div className="site-container">
          <span className="section-tag" style={{ color: "#c9952a", justifyContent: "center" }}>مشروعاتنا العقارية</span>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: "800", color: "#fff", marginBottom: "0.75rem" }}>مشروعاتنا المختارة</h1>
          <p style={{ fontSize: "0.95rem", color: "#a8a29e", maxWidth: "500px", margin: "0 auto" }}>
            اكتشف أرقى المشروعات العقارية في مصر بتصاميم معمارية استثنائية وجودة لا مثيل لها.
          </p>
        </div>
      </section>

      {/* ─── Filters ─── */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e6d9be", padding: "1rem 0", position: "sticky", top: "72px", zIndex: 30 }}>
        <div className="site-container" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{ padding: "0.45rem 1.2rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: "600", border: "1.5px solid", cursor: "pointer", transition: "all 0.2s",
                background: activeFilter === f ? "#c9952a" : "transparent",
                color: activeFilter === f ? "#fff" : "#57534e",
                borderColor: activeFilter === f ? "#c9952a" : "#d6d3d1" }}>
              {f}
            </button>
          ))}
          <span style={{ marginRight: "auto", fontSize: "0.82rem", color: "#a8a29e" }}>{filtered.length} مشروع</span>
        </div>
      </section>

      {/* ─── Projects Grid ─── */}
      <section style={{ padding: "3rem 0" }}>
        <div className="site-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){ main > section:last-child .site-container > div { grid-template-columns:1fr 1fr !important; } }
        @media(max-width:600px){ main > section:last-child .site-container > div { grid-template-columns:1fr !important; } }
      `}</style>
    </main>
  );
};

export default ProjectsPage;
