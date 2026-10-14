import { Link } from "react-router-dom";

const VisionSection = () => (
  <section
    id="vision"
    style={{
      backgroundColor: "#ffffff",
      padding: "5rem 0",
      fontFamily: "Cairo, sans-serif",
    }}
  >
    <div
      className="site-container"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
      }}
    >
      {/* ─── Text Side (Right in RTL) ─── */}
      <div>
        <span className="section-tag">قيم ومبادئ الشركة</span>
        <h2 className="section-heading" style={{ marginBottom: "1.25rem" }}>
          نبني للمستقبل
        </h2>
        <p style={{ fontSize: "0.9rem", color: "#78716c", lineHeight: "1.9", marginBottom: "1rem" }}>
          منذ تأسيسنا نسعى إلى أن نكون الشريك العقاري الأمثل لعملائنا، من خلال تقديم مشروعات تجمع بين الجمال المعماري والاستدامة والقيمة الاستثمارية الحقيقية.
        </p>
        <p style={{ fontSize: "0.9rem", color: "#78716c", lineHeight: "1.9", marginBottom: "2rem" }}>
          نؤمن أن كل مبنى نشيده هو أكثر من مجرد حجارة وإسمنت — إنه مستقبل عائلة ووعد بحياة أفضل.
        </p>
        <Link
          to="/about"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.9rem",
            fontWeight: "600",
            color: "#c9952a",
            textDecoration: "none",
            borderBottom: "1.5px solid #c9952a",
            paddingBottom: "2px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#b07d1f"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#c9952a"}
        >
          اعرف أكثر عنّا ←
        </Link>
      </div>

      {/* ─── Image Side (Left in RTL) ─── */}
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          aspectRatio: "4/5",
          backgroundColor: "#ede8de",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="material-symbols-outlined text-[28px]">account_balance</span>
      </div>
    </div>

    <style>{`
      @media (max-width: 768px) {
        #vision .site-container {
          grid-template-columns: 1fr !important;
          gap: 2rem !important;
        }
        #vision .site-container > div:last-child {
          order: -1;
          aspect-ratio: 16/9 !important;
        }
      }
    `}</style>
  </section>
);

export default VisionSection;

