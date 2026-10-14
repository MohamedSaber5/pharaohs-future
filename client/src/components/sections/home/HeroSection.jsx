import { Link } from "react-router-dom";
import logoImg from "@assets/images/logo.jpg";

const HeroSection = () => (
  <section
    id="hero"
    style={{
      backgroundColor: "#f8f3e8",
      paddingTop: "120px",
      paddingBottom: "0",
      fontFamily: "Cairo, sans-serif",
    }}
  >
    <div className="site-container">
      {/* ─── Text Content ─── */}
      <div style={{ maxWidth: "560px", marginRight: "auto", paddingBottom: "2.5rem" }}>
        <span className="section-tag">رؤية معمارية راقية</span>

        <h1
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            fontWeight: "800",
            color: "#1c1917",
            lineHeight: "1.35",
            marginBottom: "1rem",
          }}
        >
          رؤية معمارية ترتقي
          <br />
          بجودة الحياة
        </h1>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#78716c",
            lineHeight: "1.9",
            marginBottom: "2rem",
            maxWidth: "460px",
          }}
        >
          نطور مشروعات سكنية فاخرة تجمع بين الأناقة المعمارية والجودة العالية وأفضل المواقع الاستثمارية في مصر.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/projects" id="hero-cta-primary" className="btn-gold" style={{ padding: "0.7rem 1.8rem" }}>
            اكتشف المشروعات
          </Link>
          <Link to="/contact" id="hero-cta-secondary" className="btn-outline-gold" style={{ padding: "0.7rem 1.8rem" }}>
            تواصل معنا
          </Link>
        </div>
      </div>
    </div>

    {/* ─── Hero Image (Logo Placeholder) ─── */}
    <div
      style={{
        width: "100%",
        height: "clamp(300px, 45vw, 520px)",
        backgroundColor: "#ede8de",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginTop: "0.5rem",
      }}
    >
      <img
        src={logoImg}
        alt="مستقبل الفراعنة"
        style={{
          maxWidth: "320px",
          maxHeight: "320px",
          objectFit: "contain",
          opacity: 0.5,
        }}
      />
    </div>
  </section>
);

export default HeroSection;
