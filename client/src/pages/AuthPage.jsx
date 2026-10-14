import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';

const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCPXkPc2KaLFiRV8RHJQhqfstMFlyq8dBqmhxBFocqKU8pB6mxFWJQdKJbYH0h6yCqBJIDjzC5o6OAIqz-VBvC3JV3QGJCDjOANvPEMNXi3tFdaBb0yqjj69JaxpBeTxXLhvRkJUWZS2kDxO4wXomD72DPIhFBq4E2pNChVNfhBIVa1b7UzWbxCxS0j0tQH04JF3VB_bdIPMeRNVw";

export default function AuthPage() {
  const [mode, setMode]         = useState('login'); // login | register | otp
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp]           = useState(['','','','','','']);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try { await login(email, password); navigate('/'); }
    catch(err) { setError('بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.'); }
    finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try { setMode('otp'); }
    catch(err) { setError('حدث خطأ أثناء إنشاء الحساب.'); }
    finally { setLoading(false); }
  };

  const handleOtpChange = (val, idx) => {
    const n = [...otp]; n[idx] = val.slice(-1);
    setOtp(n);
    if (val && idx < 5) document.getElementById('otp-'+( idx+1))?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row -mt-20">

      {/* Left panel — Hero */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary-container text-on-primary overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary-container/60" />
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary-fixed text-[24px]">account_balance</span>
            </div>
            <div>
              <p className="font-title-lg text-title-lg text-on-primary font-bold leading-tight">مستقبل الفراعنة</p>
              <p className="font-label-sm text-label-sm text-on-primary/70">للاستثمار والتطوير العقاري</p>
            </div>
          </Link>

          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
              <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider">بوابة المستثمر الفاخر</span>
            </div>
            <h2 className="font-display-lg text-display-lg-mobile text-on-primary leading-tight">
              استثمر في<br/><span className="text-secondary-fixed">مستقبلك العقاري</span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary/75 leading-relaxed max-w-md">
              انضم إلى آلاف المستثمرين الناجحين وابدأ رحلتك العقارية مع أفضل الفرص الاستثمارية في مصر.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              {[
                {icon:"verified",text:"وصول فوري لأكثر من 480 وحدة استثمارية"},
                {icon:"support_agent",text:"مستشار شخصي متاح على مدار الساعة"},
                {icon:"trending_up",text:"عائد استثماري يصل إلى 18% سنوياً"},
              ].map(f=>(
                <div key={f.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-secondary-fixed text-[18px]">{f.icon}</span>
                  </div>
                  <span className="font-body-md text-body-md text-on-primary/80">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-8 border-t border-white/10">
            {[{v:"+25",l:"عاماً خبرة"},{v:"2000+",l:"وحدة مسلّمة"},{v:"98%",l:"رضا العملاء"}].map(s=>(
              <div key={s.l} className="text-center">
                <p className="font-financial-numeric text-on-primary font-bold text-xl">{s.v}</p>
                <p className="font-label-sm text-label-sm text-on-primary/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 lg:px-16 bg-surface min-h-screen">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-secondary-fixed text-[32px]">account_balance</span>
          </div>
          <h1 className="font-title-lg text-title-lg text-primary font-bold">مستقبل الفراعنة</h1>
        </div>

        <div className="w-full max-w-md">

          {/* OTP Mode */}
          {mode === 'otp' ? (
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary-container/30 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-secondary text-[32px]">phonelink_lock</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-2">تحقق من رقم هاتفك</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">أرسلنا رمز التحقق إلى رقم هاتفك المسجّل</p>
                <p className="font-financial-numeric text-title-md text-primary font-bold mt-1" dir="ltr">+20 {phone.slice(-8)}</p>
              </div>

              <div className="flex items-center justify-center gap-3" dir="ltr">
                {otp.map((d,i)=>(
                  <input key={i} id={"otp-"+i} type="text" inputMode="numeric" maxLength={1} value={d}
                    onChange={e=>handleOtpChange(e.target.value,i)}
                    className="w-12 h-14 text-center text-2xl font-bold rounded-xl bg-surface-container-low text-on-surface border-2 border-outline-variant focus:border-secondary focus:outline-none transition-colors" />
                ))}
              </div>

              <button className="w-full h-12 rounded-xl bg-secondary text-on-primary font-title-lg text-title-lg hover:bg-on-secondary-container transition-all shadow-lg flex items-center justify-center gap-2">
                <span>تحقق وأنشئ الحساب</span><span className="material-symbols-outlined text-[20px]">verified</span>
              </button>
              <p className="text-center font-body-md text-body-md text-on-surface-variant">
                لم تستلم الرمز؟ <button className="text-secondary font-semibold hover:underline" onClick={()=>{}}>إعادة الإرسال</button>
              </p>
              <button onClick={()=>setMode('register')} className="text-center font-label-md text-label-md text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-1 mx-auto">
                <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>العودة للتسجيل
              </button>
            </div>

          ) : (
            <>
              {/* Tabs */}
              <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-xl mb-8">
                <button onClick={()=>setMode('login')} className={`flex-1 h-10 rounded-lg font-title-md text-title-md transition-all ${mode==='login'?"bg-surface-container-lowest text-on-surface shadow-sm":"text-on-surface-variant hover:text-on-surface"}`}>تسجيل الدخول</button>
                <button onClick={()=>setMode('register')} className={`flex-1 h-10 rounded-lg font-title-md text-title-md transition-all ${mode==='register'?"bg-surface-container-lowest text-on-surface shadow-sm":"text-on-surface-variant hover:text-on-surface"}`}>إنشاء حساب</button>
              </div>

              <div className="mb-6">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-1">
                  {mode==='login'?"مرحباً بعودتك":"انضم لمجتمع المستثمرين"}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {mode==='login'?"سجّل دخولك للوصول لمحفظتك الاستثمارية":"أنشئ حسابك واستكشف أفضل الفرص العقارية"}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3.5 rounded-xl bg-error-container text-on-error-container font-body-md text-body-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">error</span>{error}
                </div>
              )}

              <form onSubmit={mode==='login'?handleLogin:handleRegister} className="flex flex-col gap-4">
                {mode==='register' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant">الاسم الكامل</label>
                    <div className="relative">
                      <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="محمد أحمد" required className="w-full h-12 pr-4 pl-12 rounded-xl bg-surface-container-low text-on-surface font-title-md text-title-md focus:outline-none focus:ring-2 focus:ring-secondary border border-transparent focus:border-secondary/30 transition-all" />
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant">البريد الإلكتروني</label>
                  <div className="relative">
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@email.com" required dir="ltr" className="w-full h-12 pr-4 pl-12 rounded-xl bg-surface-container-low text-on-surface font-financial-numeric text-financial-numeric focus:outline-none focus:ring-2 focus:ring-secondary border border-transparent focus:border-secondary/30 transition-all text-right" />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                  </div>
                </div>

                {mode==='register' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant">رقم الهاتف</label>
                    <div className="relative">
                      <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+20 100 000 0000" dir="ltr" className="w-full h-12 pr-4 pl-12 rounded-xl bg-surface-container-low text-on-surface font-financial-numeric text-financial-numeric focus:outline-none focus:ring-2 focus:ring-secondary border border-transparent focus:border-secondary/30 transition-all text-right" />
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">call</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant">كلمة المرور</label>
                  <div className="relative">
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required className="w-full h-12 pr-4 pl-12 rounded-xl bg-surface-container-low text-on-surface font-title-md text-title-md focus:outline-none focus:ring-2 focus:ring-secondary border border-transparent focus:border-secondary/30 transition-all" />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                  </div>
                </div>

                {mode==='login' && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary" />
                      <span className="font-body-md text-body-md text-on-surface-variant">تذكرني</span>
                    </label>
                    <button type="button" className="font-body-md text-body-md text-secondary hover:underline">نسيت كلمة المرور؟</button>
                  </div>
                )}

                <button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-secondary text-on-primary font-title-lg text-title-lg hover:bg-on-secondary-container transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2">
                  {loading ? <><span className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />جاري المعالجة...</> : <><span>{mode==='login'?"تسجيل الدخول":"إنشاء الحساب"}</span><span className="material-symbols-outlined text-[20px]">{mode==='login'?"login":"arrow_left_alt"}</span></>}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-outline-variant/30 text-center">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {mode==='login'?"ليس لديك حساب؟ ":"لديك حساب مسبقاً؟ "}
                  <button onClick={()=>setMode(mode==='login'?'register':'login')} className="text-secondary font-semibold hover:underline">
                    {mode==='login'?"إنشاء حساب جديد":"تسجيل الدخول"}
                  </button>
                </p>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 font-label-sm text-label-sm text-outline">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>بياناتك مُشفّرة ومحمية بتقنية SSL</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}