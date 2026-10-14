import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';
import logo from '@assets/images/logo.png';
import toast from 'react-hot-toast';

const Field = ({ label, icon, type='text', value, onChange, placeholder, required=false, hint='' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-semibold text-neutral-700">{label}</label>
    <div className="relative">
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[20px]">{icon}</span>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)}
        placeholder={placeholder} required={required}
        className="w-full h-12 pr-10 pl-4 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] focus:bg-white transition-all" />
    </div>
    {hint && <p className="text-[11px] text-neutral-400">{hint}</p>}
  </div>
);

export default function AuthPage() {
  const navigate     = useNavigate();
  const { login, register } = useAuth();
  const [mode,       setMode]       = useState('login');
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [showPass,   setShowPass]   = useState(false);

  // Form fields
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [phone,    setPhone]    = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => { setError(''); setName(''); setEmail(''); setPhone(''); setPassword(''); };
  const switchMode = (m) => { setMode(m); resetForm(); };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('يرجى إدخال البريد الإلكتروني وكلمة المرور'); return; }
    setLoading(true); setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err?.message || 'بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.');
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) { setError('يرجى تعبئة جميع الحقول المطلوبة'); return; }
    if (password.length < 8) { setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل'); return; }
    const phoneClean = phone.replace(/\s+/g, '');
    if (!/^(\+20|0)?1[0125]\d{8}$/.test(phoneClean)) {
      setError('رقم الهاتف غير صحيح — يجب أن يكون رقم مصري (01x xxxxxxxx)');
      return;
    }
    setLoading(true); setError('');
    try {
      await register({ name: name.trim(), email: email.trim().toLowerCase(), phone: phoneClean, password });
      navigate('/');
    } catch (err) {
      const msg = err?.message || '';
      if (msg.includes('already exists') || msg.includes('duplicate') || msg.includes('409'))
        setError('هذا البريد الإلكتروني مسجّل بالفعل. جرّب تسجيل الدخول.');
      else setError(msg || 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex" dir="rtl" style={{background:'#f8f9fa'}}>
      {/* Left panel - decorative */}
      <div className="hidden lg:flex flex-col justify-between p-12 flex-1 relative overflow-hidden" style={{background:'#000e1f'}}>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80')",backgroundSize:'cover'}} />
        <div className="relative z-10">
          <img src={logo} alt="مستقبل الفراعنة" className="h-12 object-contain brightness-0 invert" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{background:'rgba(201,149,42,0.15)',border:'1px solid rgba(201,149,42,0.3)'}}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{background:'#c9952a'}} />
            <span className="text-[12px] font-semibold uppercase tracking-widest" style={{color:'#c9952a'}}>مستقبل الفراعنة للعقارات</span>
          </div>
          <h2 className="text-white font-bold text-[36px] leading-tight mb-4">
            استثمر في<br /><span style={{color:'#c9952a'}}>مستقبلك العقاري</span>
          </h2>
          <p className="text-white/60 text-[16px] leading-relaxed max-w-sm">
            انضم إلى آلاف العملاء الذين وثقوا في خبرتنا لأكثر من 15 عاماً في سوق العقارات المصري
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-8">
          {[{num:'500+',label:'مشروع منجز'},{num:'15K+',label:'عميل راضٍ'},{num:'98%',label:'نسبة الرضا'}].map(s=>(
            <div key={s.label}>
              <p className="text-[24px] font-bold text-white">{s.num}</p>
              <p className="text-[12px] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 lg:max-w-md flex flex-col justify-center px-8 py-12">
        {/* Logo mobile */}
        <div className="lg:hidden mb-8">
          <img src={logo} alt="مستقبل الفراعنة" className="h-12 object-contain" />
        </div>

        {/* Tabs */}
        <div className="flex bg-neutral-100 rounded-2xl p-1 mb-8">
          {[['login','تسجيل الدخول'],['register','إنشاء حساب']].map(([m,lbl])=>(
            <button key={m} onClick={()=>switchMode(m)}
              className={`flex-1 h-10 rounded-xl text-[14px] font-bold transition-all ${mode===m?'bg-white shadow-sm text-neutral-900':'text-neutral-500 hover:text-neutral-700'}`}>
              {lbl}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <h1 className="text-[26px] font-bold text-neutral-900 mb-1">
            {mode==='login' ? 'مرحباً بعودتك!' : 'إنشاء حساب جديد'}
          </h1>
          <p className="text-[14px] text-neutral-500">
            {mode==='login' ? 'أدخل بياناتك للدخول إلى حسابك' : 'سجّل بياناتك للبدء في استعراض العقارات وحجزها'}
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl mb-5 text-[14px]" style={{background:'#fef2f2',border:'1px solid #fecaca',color:'#dc2626'}}>
            <span className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={mode==='login'?handleLogin:handleRegister} className="flex flex-col gap-4">
          {mode==='register' && (
            <Field label="الاسم الكامل *" icon="person" value={name} onChange={setName}
              placeholder="محمد أحمد" required />
          )}

          <Field label="البريد الإلكتروني *" icon="email" type="email" value={email} onChange={setEmail}
            placeholder="example@email.com" required />

          {mode==='register' && (
            <Field label="رقم الهاتف *" icon="call" type="tel" value={phone} onChange={setPhone}
              placeholder="01012345678" required
              hint="رقم مصري فعّال — سيُستخدم للتواصل معك بشأن الحجوزات" />
          )}

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-neutral-700">كلمة المرور *</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[20px]">lock</span>
              <input type={showPass?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)}
                placeholder={mode==='register'?'8 أحرف على الأقل':'أدخل كلمة المرور'} required
                className="w-full h-12 pr-10 pl-11 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] focus:bg-white transition-all" />
              <button type="button" onClick={()=>setShowPass(!showPass)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                <span className="material-symbols-outlined text-[20px]">{showPass?'visibility_off':'visibility'}</span>
              </button>
            </div>
            {mode==='register' && password.length > 0 && password.length < 8 && (
              <p className="text-[11px] text-red-500">يجب أن تكون كلمة المرور 8 أحرف على الأقل</p>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="w-full h-12 rounded-xl font-bold text-[15px] text-white mt-2 disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md"
            style={{background:'#000e1f'}}>
            {loading
              ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{mode==='login'?'جاري الدخول...':'جاري إنشاء الحساب...'}</>
              : mode==='login' ? <><span className="material-symbols-outlined text-[20px]">login</span>تسجيل الدخول</>
                              : <><span className="material-symbols-outlined text-[20px]">person_add</span>إنشاء الحساب</>
            }
          </button>
        </form>

        <p className="text-center text-[13px] text-neutral-500 mt-6">
          {mode==='login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
          <button onClick={()=>switchMode(mode==='login'?'register':'login')}
            className="font-bold hover:underline" style={{color:'#775a1a'}}>
            {mode==='login' ? 'أنشئ حساباً الآن' : 'سجّل الدخول'}
          </button>
        </p>

        <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
          <p className="text-[11px] text-neutral-400">
            بالتسجيل فأنت توافق على{' '}
            <span className="underline cursor-pointer">شروط الاستخدام</span>{' '}و{' '}
            <span className="underline cursor-pointer">سياسة الخصوصية</span>
          </p>
        </div>
      </div>
    </div>
  );
}