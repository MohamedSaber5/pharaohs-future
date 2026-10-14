
const TIMELINE = [
  { year:"١٩٩٨", title:"التأسيس",             desc:"تأسست مستقبل الفراعنة برؤية معمارية فريدة لتغيير ملامح العقارات في مصر." },
  { year:"٢٠٠٥", title:"أول مشروع كبير",      desc:"أطلقنا أول كمبوند سكني متكامل في القاهرة الجديدة بـ ٣٢٠ وحدة." },
  { year:"٢٠١٢", title:"التوسع الجغرافي",     desc:"انتقلنا إلى الساحل الشمالي والعاصمة الإدارية بعدة مشروعات متميزة." },
  { year:"٢٠٢٠", title:"الإطلاق الرقمي",      desc:"إطلاق المنصة الإلكترونية لتسهيل عملية الشراء والاستثمار العقاري." },
  { year:"٢٠٢٥", title:"٢٠٠٠+ وحدة مسلّمة",  desc:"تجاوزنا حاجز الـ ٢٠٠٠ وحدة مسلّمة بأعلى معدلات رضا العملاء." },
];

const TEAM = [
  { name:"م. عمر حسين الفاروق",  role:"الرئيس التنفيذي",            initials:"ع.ف" },
  { name:"م. نادية إبراهيم",     role:"مديرة التطوير المعماري",     initials:"ن.إ" },
  { name:"أ. طارق الشافعي",      role:"مدير المبيعات والاستثمار",   initials:"ط.ش" },
  { name:"م. سلمى عبد النور",    role:"مديرة تجربة العملاء",        initials:"س.ع" },
];

const AboutPage = () => (
  <main style={{ backgroundColor:"#f8f3e8", minHeight:"100vh", paddingTop:"72px", fontFamily:"Cairo, sans-serif" }}>
    {/* Hero */}
    <section style={{ background:"linear-gradient(135deg,#1c1917 0%,#2d2520 100%)", padding:"5rem 0", textAlign:"center" }}>
      <div className="site-container">
        <span className="material-symbols-outlined text-[28px]">account_balance</span>
        <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:"800", color:"#fff", marginBottom:"1rem" }}>من نحن</h1>
        <p style={{ fontSize:"1rem", color:"#a8a29e", maxWidth:"560px", margin:"0 auto", lineHeight:"1.9" }}>
          ربع قرن من بناء الأحلام — مستقبل الفراعنة رحلة فريدة في تطوير العقارات الفاخرة بمصر.
        </p>
      </div>
    </section>

    {/* Vision & Mission */}
    <section style={{ padding:"5rem 0" }}>
      <div className="site-container">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>
          {[
            { title:"رؤيتنا", icon:"🔭", text:"أن نكون الشريك العقاري الأمثل في مصر، نبني مجتمعات متكاملة تجمع بين الجمال المعماري والقيمة الاستثمارية الحقيقية." },
            { title:"رسالتنا", icon:"🎯", text:"تقديم منتجات عقارية استثنائية بأعلى معايير الجودة، مع تقديم تجربة شراء شفافة وموثوقة تحافظ على حقوق جميع الأطراف." },
          ].map(v => (
            <div key={v.title} style={{ background:"#fff", borderRadius:"16px", padding:"2.5rem", border:"1px solid #e6d9be", textAlign:"center" }}>
              <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>{v.icon}</div>
              <h2 style={{ fontSize:"1.3rem", fontWeight:"700", color:"#1c1917", marginBottom:"1rem" }}>{v.title}</h2>
              <p style={{ fontSize:"0.9rem", color:"#57534e", lineHeight:"1.9" }}>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section style={{ background:"#fff", padding:"4rem 0", borderTop:"1px solid #e6d9be", borderBottom:"1px solid #e6d9be" }}>
      <div className="site-container">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"2rem", textAlign:"center" }}>
          {[
            { value:"+٢٥", label:"عاماً من الخبرة" },
            { value:"+٢٠",  label:"مشروع ناجح" },
            { value:"+٢٠٠٠", label:"وحدة مسلّمة" },
            { value:"٩٨٪",   label:"رضا العملاء" },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontSize:"2.2rem", fontWeight:"800", color:"#c9952a", marginBottom:"0.5rem" }}>{s.value}</p>
              <p style={{ fontSize:"0.9rem", color:"#78716c" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section style={{ padding:"5rem 0" }}>
      <div className="site-container">
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <span className="section-tag" style={{ justifyContent:"center" }}>مسيرتنا عبر السنين</span>
          <h2 className="section-heading">رحلة النجاح</h2>
        </div>
        <div style={{ position:"relative", maxWidth:"700px", margin:"0 auto" }}>
          <div style={{ position:"absolute", right:"50%", top:0, bottom:0, width:"2px", background:"#e6d9be", transform:"translateX(50%)" }} />
          {TIMELINE.map((item, i) => (
            <div key={item.year} style={{ display:"flex", justifyContent: i%2===0 ? "flex-end" : "flex-start", marginBottom:"2rem", position:"relative" }}>
              <div style={{ position:"absolute", right:"50%", top:"1rem", width:"14px", height:"14px", borderRadius:"50%", background:"#c9952a", transform:"translateX(50%)", border:"3px solid #f8f3e8" }} />
              <div style={{ width:"44%", background:"#fff", borderRadius:"12px", padding:"1.25rem", border:"1px solid #e6d9be", marginRight: i%2===0?"3rem":"0", marginLeft: i%2!==0?"3rem":"0" }}>
                <span style={{ fontSize:"0.75rem", fontWeight:"700", color:"#c9952a", background:"#fdf8ee", padding:"0.2rem 0.6rem", borderRadius:"999px", display:"inline-block", marginBottom:"0.5rem" }}>{item.year}</span>
                <h3 style={{ fontSize:"0.95rem", fontWeight:"700", color:"#1c1917", marginBottom:"0.4rem" }}>{item.title}</h3>
                <p style={{ fontSize:"0.82rem", color:"#78716c", lineHeight:"1.7" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section style={{ background:"#fff", padding:"5rem 0", borderTop:"1px solid #e6d9be" }}>
      <div className="site-container">
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <span className="section-tag" style={{ justifyContent:"center" }}>من يقودوننا</span>
          <h2 className="section-heading">فريق القيادة</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.5rem" }}>
          {TEAM.map(member => (
            <div key={member.name} style={{ textAlign:"center", padding:"2rem 1rem", background:"#f8f3e8", borderRadius:"12px", border:"1px solid #e6d9be" }}>
              <div style={{ width:"70px", height:"70px", borderRadius:"50%", background:"linear-gradient(135deg,#c9952a,#8d611a)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem", fontSize:"1.1rem", fontWeight:"800", color:"#fff" }}>{member.initials}</div>
              <h3 style={{ fontSize:"0.95rem", fontWeight:"700", color:"#1c1917", marginBottom:"0.3rem" }}>{member.name}</h3>
              <p style={{ fontSize:"0.8rem", color:"#78716c" }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <style>{`
      @media(max-width:900px){
        section > .site-container > div[style*="1fr 1fr"] { grid-template-columns:1fr !important; }
        section > .site-container > div[style*="repeat(4,1fr)"] { grid-template-columns:1fr 1fr !important; }
      }
      @media(max-width:600px){
        section > .site-container > div[style*="repeat(4,1fr)"] { grid-template-columns:1fr 1fr !important; }
      }
    `}</style>
  </main>
);

export default AboutPage;

