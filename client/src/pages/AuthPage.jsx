import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';
import logoSrc from '@assets/images/logo.png';
import toast from 'react-hot-toast';

const HERO = "https://lh3.googleusercontent.com/aida-public/AB6AXuCPXkPc2KaLFiRV8RHJQhqfstMFlyq8dBqmhxBFocqKU8pB6mxFWJQdKJbYH0h6yCqBJIDjzC5o6OAIqz-VBvC3JV3QGJCDjOANvPEMNXi3tFdaBb0yqjj69JaxpBeTxXLhvRkJUWZS2kDxO4wXomD72DPIhFBq4E2pNChVNfhBIVa1b7UzWbxCxS0j0tQH04JF3VB_bdIPMeRNVw";

export default function AuthPage() {
  const [mode, setMode]         = useState('login');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const { login, register }     = useAuth();
  const navigate                = useNavigate();

  const reset = () => { setError(''); setName(''); setEmail(''); setPhone(''); setPassword(''); };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('يرجى إدخال البريد الإلكتروني وكلمة المرور'); return; }
    setLoading(true); setError('');
    try {
      const res = await login(email, password);
      const role = res?.data?.data?.user?.role ?? res?.data?.user?.role ?? 'user';
      navigate(role === 'admin' ? '/admin/dashboard' : '/');
    } catch (err) {
      const msg = err?.response?.data?.message ?? 'بيانات الدخول غير صحيحة';
      setError(msg);
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) { setError('يرجى تعبئة جميع الحقول'); return; }
    if (password.length < 8) { setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل'); return; }
    const phoneClean = phone.replace(/\s/g,'');
    if (!/^(\+20|0)?1[0125]\d{8}$/.test(phoneClean)) { setError('يرجى إدخال رقم هاتف مصري صحيح'); return; }
    setLoading(true); setError('');
    try {
      const res = await register({ name, email, phone: phoneClean, password });
      const role = res?.data?.data?.user?.role ?? res?.data?.user?.role ?? 'user';
      navigate(role === 'admin' ? '/admin/dashboard' : '/');
    } catch (err) {
      const msg = err?.response?.data?.message ?? 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.';
      setError(msg);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'IBM Plex Sans Arabic', Cairo, sans-serif" }}>

      {/* Hero Panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative flex-col overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(0,14,31,0.97) 0%,rgba(0,14,31,0.85) 60%,rgba(119,90,26,0.4) 100%)" }} />
        <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-14">
          <Link to="/">
            <img src={logoSrc} alt="مستقبل الفراعنة" className="h-14 w-auto object-contain" style={{ filter:"brightness(0) invert(1)" }} />
          </Link>
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full w-fit" style={{ background:"rgba(201,149,42,0.15)",border:"1px solid rgba(201,149,42,0.25)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:"#c9952a" }} />
              <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color:"#c9952a" }}>بوابة المستثمر الفاخر</span>
            </div>
            <div>
              <h2 className="text-white font-bold leading-tight mb-4" style={{ fontSize:"clamp(28px,3vw,42px)",lineHeight:1.2 }}>
                استثمر في<br/><span style={{ color:"#c9952a" }}>مستقبلك العقاري</span>
              </h2>
              <p className="leading-relaxed text-[15px]" style={{ color:"rgba(255,255,255,0.7)",maxWidth:"380px" }}>
                انضم إلى آلاف المستثمرين وابدأ رحلتك العقارية مع أفضل الفرص الاستثمارية في مصر.
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              {[
                {icon:"verified",     text:"وصول فوري لأكثر من 480 وحدة استثمارية"},
                {icon:"support_agent",text:"مستشار شخصي متاح على مدار الساعة"},
                {icon:"trending_up",  text:"عائد استثماري يصل إلى 18% سنوياً"},
              ].map(f=>(
                <div key={f.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"rgba(201,149,42,0.15)" }}>
                    <span className="material-symbols-outlined text-[20px]" style={{ color:"#c9952a" }}>{f.icon}</span>
                  </div>
                  <span className="text-[14px]" style={{ color:"rgba(255,255,255,0.8)" }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-8 pt-6" style={{ borderTop:"1px solid rgba(255,255,255,0.1)" }}>
            {[{v:"+25",l:"عاماً خبرة"},{v:"2000+",l:"وحدة مسلّمة"},{v:"98%",l:"رضا العملاء"}].map(s=>(
              <div key={s.l}>
                <p className="font-bold text-[22px]" style={{ color:"#c9952a" }}>{s.v}</p>
                <p className="text-[12px]" style={{ color:"rgba(255,255,255,0.5)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-6 py-12 sm:px-10 overflow-y-auto">
        <div className="lg:hidden mb-8 text-center">
          <img src={logoSrc} alt="مستقبل الفراعنة" className="h-14 w-auto mx-auto object-contain" />
        </div>

        <div className="w-full" style={{ maxWidth:"440px" }}>
          {/* Tab switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl mb-8" style={{ background:"#f3f4f6" }}>
            {[['login','تسجيل الدخول'],['register','إنشاء حساب']].map(([m,lbl])=>(
              <button key={m} onClick={()=>{ setMode(m); reset(); }}
                className="flex-1 h-11 rounded-xl text-[14px] font-semibold transition-all"
                style={{ background:mode===m?"white":"transparent", color:mode===m?"#000e1f":"#9ca3af", boxShadow:mode===m?"0 1px 4px rgba(0,0,0,0.08)":"none" }}>
                {lbl}
              </button>
            ))}
          </div>

          <div className="mb-7">
            <h1 className="font-bold text-[24px] mb-1.5" style={{ color:"#000e1f" }}>
              {mode==='login'?"مرحباً بعودتك 👋":"انضم للمجتمع الاستثماري 🏛️"}
            </h1>
            <p className="text-[14px] text-neutral-500">
              {mode==='login'?"سجّل دخولك للوصول لمحفظتك الاستثمارية":"أنشئ حسابك مجاناً واستكشف أفضل الفرص العقارية"}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-4 rounded-xl flex items-start gap-3 text-[14px]" style={{ background:"#fef2f2",color:"#dc2626" }}>
              <span className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={mode==='login'?handleLogin:handleRegister} className="flex flex-col gap-4">

            {mode==='register' && (
              <Field label="الاسم الكامل" icon="person" type="text" value={name} onChange={setName}
                placeholder="مثال: محمد أحمد علي" required />
            )}

            <Field label="البريد الإلكتروني" icon="mail" type="email" value={email} onChange={setEmail}
              placeholder="example@email.com" dir="ltr" required />

            {mode==='register' && (
              <Field label="رقم الهاتف" icon="call" type="tel" value={phone} onChange={setPhone}
                placeholder="01xxxxxxxxx" dir="ltr" required />
            )}

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-semibold text-neutral-700">كلمة المرور</label>
                {mode==='login' && <button type="button" className="text-[12px] font-semibold hover:underline" style={{ color:"#775a1a" }}>نسيت كلمة المرور؟</button>}
              </div>
              <div className="relative">
                <input type={showPass?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder={mode==='register'?"8 أحرف على الأقل":"أدخل كلمة المرور"} required
                  className="w-full h-12 pr-4 pl-11 rounded-xl border text-[14px] outline-none transition-all"
                  style={{ borderColor:"#e5e7eb",background:"#fafafa" }}
                  onFocus={e=>e.target.style.borderColor="#775a1a"}
                  onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
                <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <span className="material-symbols-outlined text-[20px]" style={{ color:"#9ca3af" }}>{showPass?"visibility_off":"visibility"}</span>
                </button>
              </div>
              {mode==='register' && <p className="text-[12px] text-neutral-400">يجب أن تحتوي على حروف وأرقام</p>}
            </div>

            {mode==='login' && (
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#775a1a]" />
                <span className="text-[13px] text-neutral-600">تذكرني لمدة 30 يوم</span>
              </label>
            )}

            <button type="submit" disabled={loading}
              className="w-full h-12 rounded-xl font-bold text-[15px] text-white mt-2 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background:loading?"#6b7280":"#000e1f" }}>
              {loading
                ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />جاري المعالجة...</>
                : <>{mode==='login'?"تسجيل الدخول":"إنشاء الحساب مجاناً"}<span className="material-symbols-outlined text-[20px]">{mode==='login'?"login":"arrow_left_alt"}</span></>
              }
            </button>
          </form>

          <p className="mt-6 text-center text-[14px] text-neutral-500">
            {mode==='login'?"ليس لديك حساب؟ ":"لديك حساب بالفعل؟ "}
            <button onClick={()=>{ setMode(mode==='login'?'register':'login'); reset(); }}
              className="font-bold hover:underline" style={{ color:"#775a1a" }}>
              {mode==='login'?"إنشاء حساب مجاني":"تسجيل الدخول"}
            </button>
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-neutral-400">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>مُشفّر بـ SSL 256-bit — بياناتك محمية تماماً</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, type, value, onChange, placeholder, dir, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-neutral-700">{label}</label>
      <div className="relative">
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          dir={dir} required={required}
          className="w-full h-12 pr-4 pl-11 rounded-xl border text-[14px] outline-none transition-all"
          style={{ borderColor:"#e5e7eb",background:"#fafafa",textAlign:dir==="ltr"?"right":"inherit" }}
          onFocus={e=>e.target.style.borderColor="#775a1a"}
          onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px]" style={{ color:"#9ca3af" }}>{icon}</span>
      </div>
    </div>
  );
}