import { Link } from "react-router-dom";

const CTASection = () => (
  <section
    id="cta"
    style={{
      backgroundColor: "#2d2520",
      padding: "5rem 0",
      fontFamily: "Cairo, sans-serif",
      textAlign: "center",
    }}
  >
    <div className="site-container">
      <span
        style={{
          display: "inline-block",
          fontSize: "0.75rem",
          fontWeight: "600",
          color: "#c9952a",
          letterSpacing: "0.1em",
          marginBottom: "1rem",
        }}
      >
        ابدأ رحلتك العقارية
      </span>

      <h2
        style={{
          fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
          fontWeight: "800",
          color: "#ffffff",
          marginBottom: "1rem",
          lineHeight: "1.4",
        }}
      >
        ابدأ استفسارك عن وحدتك القادمة
      </h2>

      <p
        style={{
          fontSize: "0.9rem",
          color: "#a8a29e",
          lineHeight: "1.9",
          maxWidth: "480px",
          margin: "0 auto 2rem",
        }}
      >
        فريق المبيعات والاستشارات العقارية جاهز للإجابة على جميع استفساراتك وتقديم المساعدة اللازمة.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        <Link to="/contact" id="cta-contact-btn" className="btn-gold" style={{ padding: "0.8rem 2.2rem", fontSize: "0.95rem" }}>
          تواصل فوراً
        </Link>
        <Link to="/properties" id="cta-browse-btn" className="btn-outline-gold" style={{ padding: "0.8rem 2.2rem", fontSize: "0.95rem", borderColor: "#78716c", color: "#a8a29e" }}>
          تصفح الوحدات
        </Link>
      </div>
    </div>
  </section>
);

export default CTASection;
