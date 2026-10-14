import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';

const HERO = "https://lh3.googleusercontent.com/aida-public/AB6AXuCPXkPc2KaLFiRV8RHJQhqfstMFlyq8dBqmhxBFocqKU8pB6mxFWJQdKJbYH0h6yCqBJIDjzC5o6OAIqz-VBvC3JV3QGJCDjOANvPEMNXi3tFdaBb0yqjj69JaxpBeTxXLhvRkJUWZS2kDxO4wXomD72DPIhFBq4E2pNChVNfhBIVa1b7UzWbxCxS0j0tQH04JF3VB_bdIPMeRNVw";

export default function AuthPage() {
  const [mode, setMode]         = useState('login');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp]           = useState(['','','','','','']);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try { await login(email, password); navigate('/'); }
    catch { setError('بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.'); }
    finally { setLoading(false); }
  };

  const handleRegister = (e) => {
    e.preventDefault(); setMode('otp');
  };

  const handleOtp = (val, idx) => {
    const n = [...otp]; n[idx] = val.slice(-1); setOtp(n);
    if (val && idx < 5) document.getElementById('otp' + (idx + 1))?.focus();
    if (!val && idx > 0) document.getElementById('otp' + (idx - 1))?.focus();
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'IBM Plex Sans Arabic', Cairo, sans-serif" }}>

      {/* ══ Left: Hero Panel ══ */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative flex-col overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,14,31,0.97) 0%, rgba(0,14,31,0.85) 60%, rgba(119,90,26,0.4) 100%)" }} />
        
        <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-14">
          {/* Top brand */}
          <Link to="/" className="flex items-center gap-3 w-fit">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(201,149,42,0.2)", border: "1px solid rgba(201,149,42,0.3)" }}>
              <span className="material-symbols-outlined text-[26px]" style={{ color: "#c9952a" }}>account_balance</span>
            </div>
            <div>
              <p className="text-white font-bold text-[16px] leading-tight">مستقبل الفراعنة</p>
              <p className="text-[12px]" style={{ color: "rgba(201,149,42,0.8)" }}>للاستثمار والتطوير العقاري</p>
            </div>
          </Link>

          {/* Middle content */}
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full w-fit" style={{ background: "rgba(201,149,42,0.15)", border: "1px solid rgba(201,149,42,0.25)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#c9952a" }} />
              <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: "#c9952a" }}>بوابة المستثمر الفاخر</span>
            </div>

            <div>
              <h2 className="text-white font-bold leading-tight mb-4" style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.2 }}>
                استثمر في<br/>
                <span style={{ color: "#c9952a" }}>مستقبلك العقاري</span>
              </h2>
              <p className="leading-relaxed text-[15px]" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "380px" }}>
                انضم إلى آلاف المستثمرين الناجحين وابدأ رحلتك العقارية مع أفضل الفرص الاستثمارية في مصر.
              </p>
            </div>

            <div className="flex flex-col gap-3.5">
              {[
                { icon:"verified",     text:"وصول فوري لأكثر من 480 وحدة استثمارية" },
                { icon:"support_agent",text:"مستشار شخصي متاح على مدار الساعة" },
                { icon:"trending_up",  text:"عائد استثماري يصل إلى 18% سنوياً" },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,149,42,0.15)" }}>
                    <span className="material-symbols-outlined text-[20px]" style={{ color: "#c9952a" }}>{f.icon}</span>
                  </div>
                  <span className="text-[14px]" style={{ color: "rgba(255,255,255,0.8)" }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div className="flex items-center gap-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {[{v:"+25",l:"عاماً خبرة"},{v:"2000+",l:"وحدة مسلّمة"},{v:"98%",l:"رضا العملاء"}].map(s=>(
              <div key={s.l}>
                <p className="font-bold text-[22px]" style={{ color: "#c9952a" }}>{s.v}</p>
                <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ Right: Form Panel ══ */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-6 py-12 sm:px-10 overflow-y-auto">
        
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <div className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: "#000e1f" }}>
            <span className="material-symbols-outlined text-[28px]" style={{ color: "#c9952a" }}>account_balance</span>
          </div>
          <p className="font-bold text-[16px]" style={{ color: "#000e1f" }}>مستقبل الفراعنة</p>
        </div>

        <div className="w-full" style={{ maxWidth: "440px" }}>

          {/* OTP Mode */}
          {mode === 'otp' ? (
            <div className="flex flex-col gap-6 text-center">
              <div>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(119,90,26,0.1)" }}>
                  <span className="material-symbols-outlined text-[32px]" style={{ color: "#775a1a" }}>phonelink_lock</span>
                </div>
                <h2 className="font-bold text-[22px] mb-2" style={{ color: "#000e1f" }}>تحقق من رقم هاتفك</h2>
                <p className="text-[14px] text-neutral-500">أرسلنا رمز مؤلف من 6 أرقام إلى</p>
                <p className="font-bold text-[15px] mt-1" style={{ color: "#775a1a" }} dir="ltr">+20 {phone.slice(-9)}</p>
              </div>

              <div className="flex items-center justify-center gap-3" dir="ltr">
                {otp.map((d, i) => (
                  <input key={i} id={"otp"+i} type="text" inputMode="numeric" maxLength={1} value={d}
                    onChange={e => handleOtp(e.target.value, i)}
                    className="w-12 h-14 text-center text-[22px] font-bold rounded-xl border-2 outline-none transition-all"
                    style={{
                      borderColor: d ? "#775a1a" : "#e5e7eb",
                      background: d ? "rgba(119,90,26,0.05)" : "#f9fafb",
                      color: "#000e1f",
                    }} />
                ))}
              </div>

              <button className="w-full h-12 rounded-xl font-bold text-[15px] text-white transition-all" style={{ background: "#000e1f" }}>
                تحقق وأنشئ الحساب ✓
              </button>
              <p className="text-[13px] text-neutral-500">
                لم تستلم الرمز؟{" "}
                <button className="font-bold hover:underline" style={{ color: "#775a1a" }}>إعادة الإرسال</button>
              </p>
              <button onClick={() => setMode('register')} className="text-[13px] text-neutral-400 hover:text-neutral-600 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>العودة
              </button>
            </div>

          ) : (
            <>
              {/* Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-2xl mb-8" style={{ background: "#f3f4f6" }}>
                {[['login','تسجيل الدخول'],['register','إنشاء حساب']].map(([m, lbl]) => (
                  <button key={m} onClick={() => { setMode(m); setError(''); }}
                    className="flex-1 h-11 rounded-xl text-[14px] font-semibold transition-all"
                    style={{
                      background: mode === m ? "white" : "transparent",
                      color: mode === m ? "#000e1f" : "#9ca3af",
                      boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    }}>
                    {lbl}
                  </button>
                ))}
              </div>

              {/* Heading */}
              <div className="mb-7">
                <h1 className="font-bold text-[24px] mb-1.5" style={{ color: "#000e1f" }}>
                  {mode === 'login' ? "مرحباً بعودتك 👋" : "انضم للمجتمع الاستثماري"}
                </h1>
                <p className="text-[14px] text-neutral-500">
                  {mode === 'login' ? "سجّل دخولك للوصول لمحفظتك الاستثمارية" : "أنشئ حسابك واستكشف أفضل الفرص العقارية"}
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 p-4 rounded-xl flex items-center gap-3 text-[14px]" style={{ background: "#fef2f2", color: "#dc2626" }}>
                  <span className="material-symbols-outlined text-[20px]">error</span>{error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="flex flex-col gap-4">

                {mode === 'register' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-neutral-700">الاسم الكامل</label>
                    <div className="relative">
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="مثال: محمد أحمد علي" required
                        className="w-full h-12 pr-4 pl-11 rounded-xl border text-[14px] outline-none transition-all"
                        style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
                        onFocus={e => e.target.style.borderColor="#775a1a"}
                        onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px]" style={{ color: "#9ca3af" }}>person</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-neutral-700">البريد الإلكتروني</label>
                  <div className="relative">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" required dir="ltr"
                      className="w-full h-12 pr-4 pl-11 rounded-xl border text-[14px] outline-none transition-all text-right"
                      style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
                      onFocus={e => e.target.style.borderColor="#775a1a"}
                      onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px]" style={{ color: "#9ca3af" }}>mail</span>
                  </div>
                </div>

                {mode === 'register' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-neutral-700">رقم الهاتف</label>
                    <div className="relative">
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+20 100 000 0000" dir="ltr" required
                        className="w-full h-12 pr-4 pl-11 rounded-xl border text-[14px] outline-none transition-all text-right"
                        style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
                        onFocus={e => e.target.style.borderColor="#775a1a"}
                        onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px]" style={{ color: "#9ca3af" }}>call</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-semibold text-neutral-700">كلمة المرور</label>
                    {mode === 'login' && <button type="button" className="text-[12px] font-semibold hover:underline" style={{ color: "#775a1a" }}>نسيت كلمة المرور؟</button>}
                  </div>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="أدخل كلمة المرور" required
                      className="w-full h-12 pr-4 pl-11 rounded-xl border text-[14px] outline-none transition-all"
                      style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
                      onFocus={e => e.target.style.borderColor="#775a1a"}
                      onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <span className="material-symbols-outlined text-[20px]" style={{ color: "#9ca3af" }}>{showPass ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>

                {mode === 'login' && (
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded accent-[#775a1a]" />
                    <span className="text-[13px] text-neutral-600">تذكرني لمدة 30 يوم</span>
                  </label>
                )}

                <button type="submit" disabled={loading}
                  className="w-full h-12 rounded-xl font-bold text-[15px] text-white mt-2 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: loading ? "#9ca3af" : "#000e1f" }}>
                  {loading ? (
                    <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />جاري التحقق...</>
                  ) : (
                    <>{mode === 'login' ? "تسجيل الدخول" : "إنشاء الحساب"}
                    <span className="material-symbols-outlined text-[20px]">{mode === 'login' ? "login" : "arrow_left_alt"}</span></>
                  )}
                </button>
              </form>

              {/* Switch */}
              <p className="mt-6 text-center text-[14px] text-neutral-500">
                {mode === 'login' ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
                <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                  className="font-bold hover:underline" style={{ color: "#775a1a" }}>
                  {mode === 'login' ? "إنشاء حساب مجاني" : "تسجيل الدخول"}
                </button>
              </p>

              {/* Trust badge */}
              <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-neutral-400">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>مُشفّر بـ SSL 256-bit — بياناتك محمية تماماً</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}