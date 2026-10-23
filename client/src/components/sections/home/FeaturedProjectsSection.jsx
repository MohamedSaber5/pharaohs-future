import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    name: "مشروع كيان",
    location: "أسوان الجديدة - الحي الثاني",
    description: "وحدات سكنية فاخرة تتسم بالتصميم المعاصر والمساحات الواسعة.",
    startingPrice: "٢٬٥٠٠٬٠٠٠ ج.م",
  },
  {
    id: 2,
    name: "مشروع سيتيا",
    location: "كورنيش النيل بأسوان الجديدة",
    description: "مجمع سكني متكامل الخدمات في أحدث المواقع النيلية الساحرة.",
    startingPrice: "٣٬٨٠٠٬٠٠٠ ج.م",
  },
  {
    id: 3,
    name: "مشروع ملكية",
    location: "أسوان الجديدة - الحي الأول",
    description: "فيلات ومنازل راقية تجمع الهدوء والطبيعة بالتصميم الحديث.",
    startingPrice: "٥٬٢٠٠٬٠٠٠ ج.م",
  },
];

const ProjectCard = ({ project }) => (
  <div className="property-card">
    {/* Image Placeholder */}
    <div
      style={{
        width: "100%",
        aspectRatio: "4/3",
        backgroundColor: "#ede8de",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <span className="material-symbols-outlined text-[28px]">account_balance</span>
    </div>

    {/* Card Content */}
    <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
      <p style={{ fontSize: "0.75rem", color: "#a8a29e", marginBottom: "0.25rem" }}>{project.location}</p>
      <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#1c1917", marginBottom: "0.5rem" }}>
        {project.name}
      </h3>
      <p style={{ fontSize: "0.82rem", color: "#78716c", lineHeight: "1.7", marginBottom: "1rem" }}>
        {project.description}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link
          to={`/projects/${project.id}`}
          style={{
            fontSize: "0.82rem",
            fontWeight: "600",
            color: "#c9952a",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#b07d1f"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#c9952a"}
        >
          اكتشف المشروع ←
        </Link>
        <div style={{ textAlign: "left" }}>
          <p style={{ fontSize: "0.7rem", color: "#a8a29e" }}>يبدأ من</p>
          <p style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1c1917" }}>{project.startingPrice}</p>
        </div>
      </div>
    </div>
  </div>
);

const FeaturedProjectsSection = () => (
  <section id="featured-projects" style={{ backgroundColor: "#f8f3e8", padding: "5rem 0", fontFamily: "Cairo, sans-serif" }}>
    <div className="site-container">
      {/* Section Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="section-tag">الأكثر طلباً والأفضل تقييماً</span>
          <h2 className="section-heading">مشروعاتنا المختارة</h2>
          <p style={{ fontSize: "0.875rem", color: "#78716c", marginTop: "0.5rem", maxWidth: "440px", lineHeight: "1.8" }}>
            جديد مستقبل الفراعنة: أفخم الوحدات وأرقى المواقع وأعلى جودة في التشطيب.
          </p>
        </div>
        <Link
          to="/projects"
          className="btn-outline-gold"
          style={{ fontSize: "0.82rem", padding: "0.5rem 1.2rem" }}
        >
          كل المشروعات
        </Link>
      </div>

      {/* Projects Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        #featured-projects .site-container > div:last-child {
          grid-template-columns: 1fr 1fr !important;
        }
      }
      @media (max-width: 600px) {
        #featured-projects .site-container > div:last-child {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  </section>
);

export default FeaturedProjectsSection;

