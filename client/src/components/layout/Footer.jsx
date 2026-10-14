import { Link } from "react-router-dom";
import logoImg from "@assets/images/logo.jpg";

const quickLinks = [
  { label: "الرئيسية",        to: "/" },
  { label: "مشروعاتنا",       to: "/projects" },
  { label: "الوحدات المتاحة", to: "/properties" },
  { label: "عن الشركة",       to: "/about" },
  { label: "سياسة الخصوصية",  to: "/privacy" },
];

const Footer = () => (
  <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e6d9be", paddingTop: "3.5rem", paddingBottom: "0", fontFamily: "Cairo, sans-serif" }}>
    <div className="site-container">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3rem", paddingBottom: "3rem" }}>

        {/* ─── Column 1: Logo + Description (Right in RTL) ─── */}
        <div>
          <Link to="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
            <img src={logoImg} alt="مستقبل الفراعنة" style={{ height: "52px", objectFit: "contain" }} />
          </Link>
          <p style={{ fontSize: "0.875rem", color: "#78716c", lineHeight: "1.8", maxWidth: "260px" }}>
            سرح عقاري منفرد يجمع بين عبق الهندسة الخالدة ورؤى الاستثمار العقاري الحديثة في أرقى المواقع الحيوية بجمهورية مصر العربية.
          </p>
        </div>

        {/* ─── Column 2: Quick Links (Center) ─── */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#1c1917", marginBottom: "1.25rem" }}>روابط سريعة</h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{
                    fontSize: "0.875rem",
                    color: "#78716c",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#c9952a"}
                  onMouseLeave={(e) => e.target.style.color = "#78716c"}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Column 3: Sales Contact (Left in RTL) ─── */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#1c1917", marginBottom: "1.25rem" }}>مبيعات المشاريع</h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              "+20 (2) 2345 6789",
              "+20 100 000 8900 (واتساب)",
              "sales@mostakbal-pharaohs.com",
              "القاهرة، مصر",
            ].map((item) => (
              <li key={item} style={{ fontSize: "0.875rem", color: "#78716c" }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* ─── Bottom Bar ─── */}
    <div style={{ borderTop: "1px solid #e6d9be", padding: "1rem 0" }}>
      <div className="site-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <p style={{ fontSize: "0.78rem", color: "#a8a29e" }}>
          جميع الحقوق محفوظة © مستقبل الفراعنة للاستثمار والتطوير العقاري
        </p>
        <p style={{ fontSize: "0.78rem", color: "#a8a29e" }}>
          الهندسة والتطوير المعماري الراقي
        </p>
      </div>
    </div>

    <style>{`
      @media (max-width: 768px) {
        footer > div > div > div[style*="grid"] {
          grid-template-columns: 1fr !important;
          gap: 2rem !important;
        }
      }
    `}</style>
  </footer>
);

export default Footer;
