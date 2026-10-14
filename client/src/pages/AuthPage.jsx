import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";
import logoImg from "@assets/images/logo.jpg";

const AuthPage = () => {
  const [tab, setTab]     = useState("login");
  const [form, setForm]   = useState({ name:"", email:"", phone:"", password:"" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const { login, register }   = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      if (tab === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      }
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "حدث خطأ، يرجى المحاولة مرة أخرى");
    } finally { setLoading(false); }
  };

  const inputStyle = { width:"100%", padding:"0.75rem 1rem", border:"1.5px solid #e6d9be", borderRadius:"8px", fontFamily:"Cairo,sans-serif", fontSize:"0.9rem", background:"#f8f3e8", outline:"none", transition:"border-color 0.2s", boxSizing:"border-box" };

  return (
    <main style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", fontFamily:"Cairo, sans-serif" }}>
      {/* ─── Left Panel: Decorative ─── */}
      <div style={{ background:"linear-gradient(160deg,#1c1917 0%,#2d2520 60%,#3d3028 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"3rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"400px", height:"400px", borderRadius:"50%", background:"rgba(201,149,42,0.06)" }} />
        <div style={{ position:"absolute", bottom:"-60px", left:"-60px", width:"300px", height:"300px", borderRadius:"50%", background:"rgba(201,149,42,0.04)" }} />
        <img src={logoImg} alt="مستقبل الفراعنة" style={{ width:"180px", objectFit:"contain", marginBottom:"2rem", filter:"brightness(0) invert(1)", opacity:0.85 }} />
        <h2 style={{ fontSize:"1.8rem", fontWeight:"800", color:"#fff", textAlign:"center", lineHeight:"1.4", marginBottom:"1rem" }}>
          بوابتك نحو<br /><span style={{ color:"#c9952a" }}>أرقى العقارات</span>
        </h2>
        <p style={{ fontSize:"0.9rem", color:"#a8a29e", textAlign:"center", lineHeight:"1.9", maxWidth:"300px" }}>
          سجّل دخولك للوصول إلى أفخم الوحدات والمشروعات العقارية الحصرية في مصر.
        </p>
        <div style={{ marginTop:"2.5rem", display:"flex", flexDirection:"column", gap:"0.75rem", width:"100%", maxWidth:"280px" }}>
          {["+25 عاماً من الخبرة المعمارية","١٠٠٪ ضمان قانوني","أكثر من ٢٠ مشروع ناجح"].map(t => (
            <div key={t} style={{ display:"flex", alignItems:"center", gap:"0.75rem", background:"rgba(255,255,255,0.04)", padding:"0.75rem 1rem", borderRadius:"8px" }}>
              <span style={{ color:"#c9952a", fontWeight:"700", fontSize:"1rem" }}>✓</span>
              <span style={{ fontSize:"0.85rem", color:"#d6d3d1" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Right Panel: Form ─── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", background:"#f8f3e8" }}>
        <div style={{ width:"100%", maxWidth:"440px" }}>
          {/* Tabs */}
          <div style={{ display:"flex", background:"#fff", borderRadius:"12px", padding:"4px", marginBottom:"2rem", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            {[["login","تسجيل الدخول"],["register","إنشاء حساب"]].map(([id,label]) => (
              <button key={id} onClick={() => { setTab(id); setError(""); }}
                style={{ flex:1, padding:"0.65rem", borderRadius:"10px", border:"none", cursor:"pointer", fontFamily:"Cairo,sans-serif", fontSize:"0.9rem", fontWeight:"600", transition:"all 0.2s",
                  background:tab===id ? "#c9952a" : "transparent",
                  color:tab===id ? "#fff" : "#78716c" }}>
                {label}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize:"1.5rem", fontWeight:"800", color:"#1c1917", marginBottom:"0.4rem" }}>
            {tab === "login" ? "مرحباً بعودتك" : "انضم إلينا اليوم"}
          </h2>
          <p style={{ fontSize:"0.85rem", color:"#78716c", marginBottom:"1.75rem" }}>
            {tab === "login" ? "أدخل بياناتك للوصول إلى حسابك" : "أنشئ حسابك مجاناً للاستفادة من خدماتنا"}
          </p>

          {error && <div style={{ background:"#fee2e2", color:"#991b1b", padding:"0.75rem 1rem", borderRadius:"8px", fontSize:"0.85rem", marginBottom:"1rem" }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            {tab === "register" && (
              <input name="name" value={form.name} onChange={handleChange} placeholder="الاسم الكامل" required style={inputStyle} />
            )}
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="البريد الإلكتروني" required style={inputStyle} />
            {tab === "register" && (
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="رقم الهاتف" style={inputStyle} />
            )}
            <div style={{ position:"relative" }}>
              <input name="password" type={showPwd ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="كلمة المرور" required style={{ ...inputStyle, paddingLeft:"2.5rem" }} />
              <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position:"absolute", left:"0.75rem", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#78716c", fontSize:"1.1rem" }}>
                {showPwd ? "🙈" : "👁"}
              </button>
            </div>
            {tab === "login" && (
              <div style={{ textAlign:"left" }}>
                <a href="#" style={{ fontSize:"0.82rem", color:"#c9952a", textDecoration:"none" }}>نسيت كلمة المرور؟</a>
              </div>
            )}
            <button type="submit" className="btn-gold" disabled={loading}
              style={{ padding:"0.85rem", fontSize:"0.95rem", justifyContent:"center", opacity:loading?0.7:1 }}>
              {loading ? "جاري التحميل..." : tab === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
            </button>
          </form>

          <p style={{ textAlign:"center", fontSize:"0.82rem", color:"#78716c", marginTop:"1.5rem" }}>
            {tab === "login" ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
            <button onClick={() => setTab(tab==="login"?"register":"login")} style={{ color:"#c9952a", fontWeight:"700", background:"none", border:"none", cursor:"pointer", fontFamily:"Cairo,sans-serif", fontSize:"0.82rem" }}>
              {tab === "login" ? "أنشئ حساباً" : "سجّل دخولك"}
            </button>
          </p>

          <p style={{ textAlign:"center", fontSize:"0.75rem", color:"#a8a29e", marginTop:"1rem" }}>
            بالمتابعة توافق على <a href="#" style={{ color:"#c9952a" }}>الشروط والأحكام</a> و<a href="#" style={{ color:"#c9952a" }}>سياسة الخصوصية</a>
          </p>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          main[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns:1fr !important; }
          main > div:first-child { display:none !important; }
          main > div:last-child { padding:2rem 1rem !important; }
        }
      `}</style>
    </main>
  );
};

export default AuthPage;
