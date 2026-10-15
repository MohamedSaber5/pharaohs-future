import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';
import logo from '@assets/images/logo.png';
import toast from 'react-hot-toast';

// ── Field Component ────────────────────────────────────────────────
function Field({ label, icon, type = 'text', value, onChange, placeholder, hint = '', error = '' }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[13px] font-semibold text-neutral-700">{label}</label>
      <div className="relative">
        <span
          className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[20px] transition-colors"
          style={{ color: error ? '#dc2626' : focused ? '#775a1a' : '#9ca3af' }}>
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={type === 'password' ? 'current-password' : 'on'}
          className="w-full h-12 pr-10 pl-4 rounded-xl text-[14px] outline-none transition-all"
          style={{
            border: error ? '1.5px solid #dc2626' : focused ? '1.5px solid #775a1a' : '1.5px solid #e5e7eb',
            background: error ? '#fef2f2' : focused ? '#fff' : '#f9fafb',
          }}
        />
      </div>
      {error && <p className="text-[11px] text-red-600 flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">error</span>{error}</p>}
      {!error && hint && <p className="text-[11px] text-neutral-400">{hint}</p>}
    </div>
  );
}

// ── Egyptian phone validator ───────────────────────────────────────
const isEgPhone = (p) => /^(010|011|012|015)d{8}$/.test(p.replace(/s/g, ''));

// ── Main Component ─────────────────────────────────────────────────
export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [mode,     setMode]     = useState('login');
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [apiError, setApiError] = useState('');

  // Fields
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [phone,    setPhone]    = useState('');
  const [password, setPassword] = useState('');

  // Per-field validation errors
  const [errs, setErrs] = useState({});

  const clearErr = (field) => setErrs(prev => ({ ...prev, [field]: '' }));

  const switchMode = (m) => {
    setMode(m);
    setApiError('');
    setErrs({});
    setName(''); setEmail(''); setPhone(''); setPassword('');
  };

  // ── Validate ──────────────────────────────────────────────────
  const validate = useCallback(() => {
    const e = {};
    if (mode === 'register' && !name.trim())        e.name     = 'الاسم مطلوب';
    if (!email.trim())                              e.email    = 'البريد الإلكتروني مطلوب';
    else if (!/^S+@S+.S+$/.test(email))        e.email    = 'بريد إلكتروني غير صحيح';
    if (mode === 'register' && !phone.trim())       e.phone    = 'رقم الهاتف مطلوب';
    else if (mode === 'register' && !isEgPhone(phone)) e.phone = 'رقم مصري غير صحيح (010/011/012/015)';
    if (!password)                                  e.password = 'كلمة المرور مطلوبة';
    else if (mode === 'register' && password.length < 8) e.password = 'كلمة المرور 8 أحرف على الأقل';
    setErrs(e);
    return Object.keys(e).length === 0;
  }, [mode, name, email, phone, password]);

  // ── Parse API error message ────────────────────────────────────
  const parseError = (err) => {
    const msg = err?.response?.data?.message || err?.message || '';
    if (msg.includes('email') || msg.includes('البريد')) return 'هذا البريد الإلكتروني مسجّل مسبقاً';
    if (msg.includes('password') || msg.includes('كلمة المرور') || msg.includes('Invalid')) return 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
    if (msg.includes('validation') || msg.includes('Validation')) return 'يرجى مراجعة البيانات المدخلة';
    if (msg.includes('Network') || msg.includes('ECONNREFUSED')) return 'تعذّر الاتصال بالخادم، تحقق من الاتصال';
    if (msg) return msg;
    return 'حدث خطأ غير متوقع، يرجى المحاولة مجدداً';
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return; // stop if client-side errors

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email.trim(), password);
        navigate('/');
      } else {
        await register({ name: name.trim(), email: email.trim(), phone: phone.trim(), password });
        navigate('/');
      }
    } catch (err) {
      const msg = parseError(err);
      setApiError(msg);
      // Also highlight field if possible
      if (msg.includes('كلمة المرور') || msg.includes('غير صحيح')) {
        setErrs(prev => ({ ...prev, password: 'كلمة المرور غير صحيحة' }));
      }
      if (msg.includes('البريد') && mode === 'login') {
        setErrs(prev => ({ ...prev, email: 'بريد غير صحيح أو غير مسجّل' }));
      }
    } finally {
      setLoading(false);
    }
  };

  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen flex" dir="rtl" style={{ background: '#f8f9fa' }}>
      {/* ── Left Decorative Panel ─────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between p-12 w-[480px] flex-shrink-0 relative overflow-hidden"
        style={{ background: '#000e1f' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80')", backgroundSize: 'cover' }} />

        <div className="relative z-10">
          <img src={logo} alt="مستقبل الفراعنة" className="h-12 object-contain brightness-0 invert" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(201,149,42,0.15)', border: '1px solid rgba(201,149,42,0.3)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#c9952a' }} />
            <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: '#c9952a' }}>
              مستقبل الفراعنة للعقارات
            </span>
          </div>
          <h2 className="text-white font-bold text-[36px] leading-tight mb-4">
            استثمر في<br /><span style={{ color: '#c9952a' }}>مستقبلك العقاري</span>
          </h2>
          <p className="text-white/60 text-[16px] leading-relaxed max-w-sm">
            انضم إلى آلاف العملاء الذين وثقوا فينا في اختياراتهم لأفضل المشاريع العقارية في أسوان
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-8">
          {[{ num: '500+', label: 'مشروع منجز' }, { num: '15K+', label: 'عميل راضٍ' }, { num: '98%', label: 'نسبة الرضا' }].map(s => (
            <div key={s.label}>
              <p className="text-[24px] font-bold text-white">{s.num}</p>
              <p className="text-[12px] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Form Panel ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 max-w-lg mx-auto w-full">
        {/* Logo mobile */}
        <div className="lg:hidden mb-8 flex justify-center">
          <img src={logo} alt="مستقبل الفراعنة" className="h-10 object-contain" />
        </div>

        {/* Mode Tabs */}
        <div className="flex bg-neutral-100 rounded-2xl p-1 mb-8">
          {[['login', 'تسجيل الدخول'], ['register', 'إنشاء حساب']].map(([m, lbl]) => (
            <button key={m} onClick={() => switchMode(m)}
              className={`flex-1 h-10 rounded-xl text-[14px] font-bold transition-all ${mode === m ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}>
              {lbl}
            </button>
          ))}
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-[26px] font-bold text-neutral-900 mb-1">
            {isLogin ? 'مرحباً بعودتك!' : 'إنشاء حساب جديد'}
          </h1>
          <p className="text-[14px] text-neutral-500">
            {isLogin ? 'أدخل بياناتك للدخول إلى حسابك' : 'سجّل بياناتك للبدء في استعراض العقارات'}
          </p>
        </div>

        {/* API Error Banner */}
        {apiError && (
          <div className="flex items-start gap-3 p-4 rounded-xl mb-5 text-[14px]"
            style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
            <span className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5">error</span>
            <div className="flex-1">
              <p className="font-semibold mb-0.5">حدث خطأ</p>
              <p className="text-[13px] opacity-80">{apiError}</p>
            </div>
            <button onClick={() => setApiError('')} className="opacity-60 hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {!isLogin && (
            <Field label="الاسم الكامل *" icon="person" value={name}
              onChange={v => { setName(v); clearErr('name'); }}
              placeholder="محمد أحمد" error={errs.name} />
          )}

          <Field label="البريد الإلكتروني *" icon="email" type="email" value={email}
            onChange={v => { setEmail(v); clearErr('email'); }}
            placeholder="example@email.com" error={errs.email} />

          {!isLogin && (
            <Field label="رقم الهاتف *" icon="call" type="tel" value={phone}
              onChange={v => { setPhone(v); clearErr('phone'); }}
              placeholder="01012345678" error={errs.phone}
              hint="رقم مصري فقط (010/011/012/015)" />
          )}

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-neutral-700">كلمة المرور *</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[20px]"
                style={{ color: errs.password ? '#dc2626' : '#9ca3af' }}>lock</span>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); clearErr('password'); }}
                placeholder={isLogin ? 'أدخل كلمة المرور' : '8 أحرف على الأقل'}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                className="w-full h-12 pr-10 pl-11 rounded-xl text-[14px] outline-none transition-all"
                style={{
                  border: errs.password ? '1.5px solid #dc2626' : '1.5px solid #e5e7eb',
                  background: errs.password ? '#fef2f2' : '#f9fafb',
                }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors">
                <span className="material-symbols-outlined text-[20px]">{showPass ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
            {errs.password && (
              <p className="text-[11px] text-red-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">error</span>{errs.password}
              </p>
            )}
            {!isLogin && !errs.password && password.length > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-neutral-200">
                  <div className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: password.length >= 12 ? '100%' : password.length >= 8 ? '60%' : '30%',
                      background: password.length >= 12 ? '#22c55e' : password.length >= 8 ? '#f59e0b' : '#ef4444',
                    }} />
                </div>
                <span className="text-[11px] text-neutral-500">
                  {password.length >= 12 ? 'قوية' : password.length >= 8 ? 'مقبولة' : 'ضعيفة'}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading}
            className="w-full h-12 rounded-xl font-bold text-[15px] text-white mt-2 disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md active:scale-[0.98]"
            style={{ background: '#000e1f' }}>
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isLogin ? 'جارٍ الدخول...' : 'جارٍ إنشاء الحساب...'}
              </>
            ) : isLogin ? (
              <><span className="material-symbols-outlined text-[20px]">login</span>تسجيل الدخول</>
            ) : (
              <><span className="material-symbols-outlined text-[20px]">person_add</span>إنشاء الحساب</>
            )}
          </button>
        </form>

        {/* Switch mode link */}
        <p className="text-center text-[13px] text-neutral-500 mt-6">
          {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
          <button onClick={() => switchMode(isLogin ? 'register' : 'login')}
            className="font-bold hover:underline" style={{ color: '#775a1a' }}>
            {isLogin ? 'أنشئ حسابك الآن' : 'سجّل الدخول'}
          </button>
        </p>

        <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
          <p className="text-[11px] text-neutral-400">
            بالتسجيل فإنك توافق على{' '}
            <span className="underline cursor-pointer hover:text-neutral-600">شروط الاستخدام</span>{' '}و{' '}
            <span className="underline cursor-pointer hover:text-neutral-600">سياسة الخصوصية</span>
          </p>
        </div>
      </div>
    </div>
  );
}