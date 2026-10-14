import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({ name:"", phone:"", email:"", project:"", message:"" });
  const [sent, setSent]  = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  const inputStyle = { width:"100%", padding:"0.75rem 1rem", border:"1.5px solid #e6d9be", borderRadius:"8px", fontFamily:"Cairo,sans-serif", fontSize:"0.9rem", background:"#f8f3e8", outline:"none", boxSizing:"border-box" };

  return (
    <main style={{ backgroundColor:"#f8f3e8", minHeight:"100vh", paddingTop:"72px", fontFamily:"Cairo, sans-serif" }}>
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#1c1917 0%,#2d2520 100%)", padding:"4rem 0 3rem", textAlign:"center" }}>
        <div className="site-container">
          <span className="section-tag" style={{ color:"#c9952a", justifyContent:"center" }}>نحن هنا لمساعدتك</span>
          <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:"800", color:"#fff", marginBottom:"0.75rem" }}>تواصل معنا</h1>
          <p style={{ fontSize:"0.95rem", color:"#a8a29e", maxWidth:"460px", margin:"0 auto" }}>فريق مستشاري المبيعات جاهز للإجابة على استفساراتك وتقديم المشورة العقارية المناسبة.</p>
        </div>
      </section>

      <section style={{ padding:"4rem 0" }}>
        <div className="site-container">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 420px", gap:"3rem" }}>
            {/* Form */}
            <div>
              <h2 style={{ fontSize:"1.3rem", fontWeight:"700", color:"#1c1917", marginBottom:"1.5rem" }}>أرسل استفساراً</h2>
              {sent ? (
                <div style={{ background:"#dcfce7", border:"1px solid #86efac", borderRadius:"12px", padding:"2rem", textAlign:"center" }}>
                  <p style={{ fontSize:"2rem", marginBottom:"0.5rem" }}>✅</p>
                  <h3 style={{ fontSize:"1.1rem", fontWeight:"700", color:"#166534", marginBottom:"0.5rem" }}>تم الإرسال بنجاح!</h3>
                  <p style={{ fontSize:"0.88rem", color:"#166534" }}>سيتواصل معك أحد مستشارينا خلال ٢٤ ساعة.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                    <div>
                      <label style={{ display:"block", fontSize:"0.82rem", fontWeight:"600", color:"#57534e", marginBottom:"0.35rem" }}>الاسم الكامل *</label>
                      <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder="محمد أحمد" />
                    </div>
                    <div>
                      <label style={{ display:"block", fontSize:"0.82rem", fontWeight:"600", color:"#57534e", marginBottom:"0.35rem" }}>رقم الهاتف *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} required style={inputStyle} placeholder="01xxxxxxxxx" />
                    </div>
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:"0.82rem", fontWeight:"600", color:"#57534e", marginBottom:"0.35rem" }}>البريد الإلكتروني</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} placeholder="example@email.com" />
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:"0.82rem", fontWeight:"600", color:"#57534e", marginBottom:"0.35rem" }}>المشروع المهتم به</label>
                    <select name="project" value={form.project} onChange={handleChange} style={inputStyle}>
                      <option value="">اختر المشروع</option>
                      {["أبراج حورس الاستثمارية","كمبوند سيتيا","فيلات الملكية","مشروع كيان","بوابة القاهرة التجاري","ريزيدنس بلو مار"].map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:"0.82rem", fontWeight:"600", color:"#57534e", marginBottom:"0.35rem" }}>رسالتك</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5} style={{ ...inputStyle, resize:"vertical" }} placeholder="أخبرنا عن احتياجاتك العقارية..." />
                  </div>
                  <button type="submit" className="btn-gold" style={{ padding:"0.85rem", fontSize:"0.95rem", justifyContent:"center", alignSelf:"flex-start", paddingInline:"2.5rem" }}>إرسال الاستفسار</button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
              <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e6d9be", padding:"1.75rem" }}>
                <h3 style={{ fontSize:"1rem", fontWeight:"700", color:"#1c1917", marginBottom:"1.25rem" }}>معلومات التواصل</h3>
                {[
                  { icon:"📞", label:"الهاتف", value:"+20 (2) 2345 6789" },
                  { icon:"📱", label:"واتساب", value:"+20 100 000 8900" },
                  { icon:"📧", label:"البريد", value:"sales@pharaohs-future.com" },
                  { icon:"📍", label:"العنوان", value:"القاهرة، جمهورية مصر العربية" },
                  { icon:"🕐", label:"ساعات العمل", value:"السبت–الخميس ٩ص–٦م" },
                ].map(info => (
                  <div key={info.label} style={{ display:"flex", gap:"0.85rem", paddingBottom:"0.9rem", marginBottom:"0.9rem", borderBottom:"1px solid #f0ebe0" }}>
                    <span style={{ fontSize:"1.2rem", flexShrink:0 }}>{info.icon}</span>
                    <div>
                      <p style={{ fontSize:"0.72rem", color:"#a8a29e", marginBottom:"0.15rem" }}>{info.label}</p>
                      <p style={{ fontSize:"0.88rem", fontWeight:"600", color:"#1c1917" }}>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background:"linear-gradient(135deg,#1c1917,#2d2520)", borderRadius:"12px", padding:"1.75rem" }}>
                <p style={{ fontSize:"0.78rem", color:"#c9952a", fontWeight:"600", marginBottom:"0.5rem" }}>مبيعات المشروعات</p>
                <p style={{ fontSize:"1.6rem", fontWeight:"800", color:"#fff", marginBottom:"0.25rem" }}>19822</p>
                <p style={{ fontSize:"0.82rem", color:"#a8a29e" }}>خط مبيعات مجاني — متاح ٧ أيام أسبوعياً</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          section > .site-container > div[style*="1fr 420px"] { grid-template-columns:1fr !important; }
          form > div[style*="1fr 1fr"] { grid-template-columns:1fr !important; }
        }
      `}</style>
    </main>
  );
};

export default ContactPage;
