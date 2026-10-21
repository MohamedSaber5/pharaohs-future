import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';
import authService from '@services/auth.service.js';
import logo from '@assets/images/logo.png';
import toast from 'react-hot-toast';

// Egyptian phone validator: exactly 11 digits starting with 010, 011, 012, or 015
const isEgPhone = (p) => /^(010|011|012|015)\d{8}$/.test(p.trim());

// Password strength evaluator
const checkPasswordStrength = (pass) => {
  const hasMinLen = pass.length >= 8;
  const hasLower = /[a-z]/.test(pass);
  const hasUpper = /[A-Z]/.test(pass);
  const hasNumberOrSymbol = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);

  let score = 0;
  if (hasMinLen) score++;
  if (hasLower) score++;
  if (hasUpper) score++;
  if (hasNumberOrSymbol) score++;

  return {
    score,
    hasMinLen,
    hasLower,
    hasUpper,
    hasNumberOrSymbol,
    isStrong: score >= 4,
  };
};

function PasswordStrengthMeter({ password }) {
  if (!password) return null;
  const { score, hasMinLen, hasLower, hasUpper, hasNumberOrSymbol } = checkPasswordStrength(password);

  const levels = [
    { label: 'ضعيفة جداً', color: '#ef4444', width: '25%' },
    { label: 'مقبولة', color: '#f59e0b', width: '50%' },
    { label: 'جيدة', color: '#3b82f6', width: '75%' },
    { label: 'قوية ومحمية', color: '#10b981', width: '100%' },
  ];
  const cur = levels[Math.max(0, score - 1)] || levels[0];

  return (
    <div className="flex flex-col gap-2 mt-2 p-3.5 rounded-2xl bg-amber-50/50 border border-[#c9952a]/20">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold text-neutral-600">درجة أمان كلمة المرور:</span>
        <span className="font-bold px-2 py-0.5 rounded-md text-white text-[10px]" style={{ background: cur.color }}>
          {cur.label}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden bg-neutral-200">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: cur.width, background: cur.color }}
        />
      </div>
      <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
        <span className={`flex items-center gap-1 ${hasMinLen ? 'text-green-600 font-bold' : 'text-neutral-400'}`}>
          <span className="material-symbols-outlined text-[14px]">{hasMinLen ? 'check_circle' : 'radio_button_unchecked'}</span>
          8 أحرف على الأقل
        </span>
        <span className={`flex items-center gap-1 ${hasUpper ? 'text-green-600 font-bold' : 'text-neutral-400'}`}>
          <span className="material-symbols-outlined text-[14px]">{hasUpper ? 'check_circle' : 'radio_button_unchecked'}</span>
          حرف كبير (A-Z)
        </span>
        <span className={`flex items-center gap-1 ${hasLower ? 'text-green-600 font-bold' : 'text-neutral-400'}`}>
          <span className="material-symbols-outlined text-[14px]">{hasLower ? 'check_circle' : 'radio_button_unchecked'}</span>
          حرف صغير (a-z)
        </span>
        <span className={`flex items-center gap-1 ${hasNumberOrSymbol ? 'text-green-600 font-bold' : 'text-neutral-400'}`}>
          <span className="material-symbols-outlined text-[14px]">{hasNumberOrSymbol ? 'check_circle' : 'radio_button_unchecked'}</span>
          أرقام أو رموز (#1)
        </span>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  hint = '',
  error = '',
  maxLength,
  showCounter = false,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-bold text-neutral-800">{label}</label>
        {showCounter && maxLength && (
          <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
            value.length === maxLength ? 'bg-green-100 text-green-700 font-bold' : 'bg-neutral-100 text-neutral-500'
          }`}>
            {value.length} / {maxLength}
          </span>
        )}
      </div>
      <div className="relative">
        <span
          className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[20px] transition-colors"
          style={{ color: error ? '#dc2626' : focused ? '#c9952a' : '#9ca3af' }}
        >
          {icon}
        </span>
        <input
          type={type}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full h-12 pr-11 pl-4 rounded-xl text-[14px] outline-none transition-all shadow-sm"
          style={{
            border: error
              ? '1.5px solid #dc2626'
              : focused
              ? '1.5px solid #c9952a'
              : '1.5px solid #e5e7eb',
            background: error ? '#fef2f2' : focused ? '#ffffff' : '#f9fafb',
            boxShadow: focused ? '0 0 0 3px rgba(201, 149, 42, 0.12)' : 'none',
          }}
        />
      </div>
      {error && (
        <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-0.5">
          <span className="material-symbols-outlined text-[13px]">error</span>
          {error}
        </p>
      )}
      {!error && hint && <p className="text-[11px] text-neutral-400">{hint}</p>}
    </div>
  );
}

export default function AuthPage({ defaultMode = 'login' }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, register } = useAuth();

  // Mode: 'login' | 'register' | 'forgot'
  const initialMode = searchParams.get('mode') || defaultMode;
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errs, setErrs] = useState({});

  // Login / Register state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // ─── 3-Step Forgot Password State ─────────────────────────────
  // step 1: enter email ONLY (NO password fields!)
  // step 2: enter 6-digit OTP ONLY
  // step 3: enter new password & confirm
  const [fpStep, setFpStep] = useState(1);
  const [fpEmail, setFpEmail] = useState('');
  const [fpOtp, setFpOtp] = useState(['', '', '', '', '', '']);
  const [fpPass, setFpPass] = useState('');
  const [fpConfirmPass, setFpConfirmPass] = useState('');
  const [fpShowPass, setFpShowPass] = useState(false);
  const [fpCountdown, setFpCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [fpErrs, setFpErrs] = useState({});

  const otpInputs = useRef([]);

  // Sync mode with URL if search param changes
  useEffect(() => {
    const qMode = searchParams.get('mode');
    if (qMode && ['login', 'register', 'forgot'].includes(qMode)) {
      setMode(qMode);
    }
  }, [searchParams]);

  // Resend OTP countdown timer
  useEffect(() => {
    let timer;
    if (mode === 'forgot' && fpStep === 2 && fpCountdown > 0) {
      setCanResend(false);
      timer = setInterval(() => {
        setFpCountdown((c) => {
          if (c <= 1) {
            setCanResend(true);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode, fpStep, fpCountdown]);

  const clearErr = (f) => setErrs((p) => ({ ...p, [f]: '' }));

  const switchMode = (m) => {
    setMode(m);
    setSearchParams({ mode: m });
    setApiError('');
    setErrs({});
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    // Reset forgot password state cleanly
    setFpStep(1);
    setFpEmail('');
    setFpOtp(['', '', '', '', '', '']);
    setFpPass('');
    setFpConfirmPass('');
    setFpErrs({});
    setFpCountdown(60);
    setCanResend(false);
  };

  const parseError = (err) => {
    const msg = err?.response?.data?.message || err?.message || '';
    if (msg.includes('email') || msg.includes('البريد')) return 'هذا البريد الإلكتروني مسجّل مسبقاً أو غير صحيح';
    if (msg.includes('password') || msg.includes('كلمة') || msg.includes('Invalid')) return 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
    if (msg.includes('هاتف') || msg.includes('phone')) return msg;
    if (msg.includes('رمز') || msg.includes('OTP') || msg.includes('otp')) return msg;
    if (msg.includes('Network') || msg.includes('ECONNREFUSED')) return 'تعذّر الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت';
    return msg || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
  };

  // Strictly enforce 11-digit numbers only for phone inputs
  const handlePhoneChange = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 11);
    setPhone(clean);
    clearErr('phone');
  };

  // ─── Validation for Login & Register ─────────────────────────
  const validate = useCallback(() => {
    const e = {};
    if (mode === 'register') {
      if (!name.trim()) e.name = 'الاسم الكامل مطلوب';
      else if (name.trim().length < 2) e.name = 'الاسم يجب أن يكون حرفين على الأقل';
    }

    if (!email.trim()) {
      e.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      e.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }

    if (mode === 'register') {
      if (!phone.trim()) {
        e.phone = 'رقم الهاتف مطلوب';
      } else if (phone.length !== 11) {
        e.phone = `رقم الهاتف يجب أن يتكون من 11 رقماً بالضبط (أدخلت ${phone.length} رقماً)`;
      } else if (!isEgPhone(phone)) {
        e.phone = 'رقم الهاتف يجب أن يبدأ بـ (010 أو 011 أو 012 أو 015)';
      }
    }

    if (!password) {
      e.password = 'كلمة المرور مطلوبة';
    } else if (mode === 'register') {
      const { isStrong } = checkPasswordStrength(password);
      if (!isStrong) {
        e.password = 'كلمة المرور يجب أن تكون قوية (8 أحرف + حرف كبير + حرف صغير + رقم/رمز)';
      }
    }

    setErrs(e);
    return Object.keys(e).length === 0;
  }, [mode, name, email, phone, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email.trim().toLowerCase(), password);
        navigate('/');
      } else {
        await register({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          password,
        });
        navigate('/');
      }
    } catch (err) {
      const msg = parseError(err);
      setApiError(msg);
      if (msg.includes('كلمة المرور') || msg.includes('الدخول')) {
        setErrs((p) => ({ ...p, password: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }));
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── 3-Step Forgot Password Handlers ─────────────────────────

  // Step 1: Request OTP via Email (NO PASSWORD INPUT!)
  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    const fe = {};
    if (!fpEmail.trim()) {
      fe.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^\S+@\S+\.\S+$/.test(fpEmail.trim())) {
      fe.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }
    if (Object.keys(fe).length) {
      setFpErrs(fe);
      return;
    }

    setLoading(true);
    setFpErrs({});
    try {
      await authService.forgotPassword(fpEmail.trim().toLowerCase());
      toast.success('تم إرسال رمز التحقق إلى بريدك الإلكتروني بنجاح 📩');
      setFpStep(2);
      setFpCountdown(60);
      setCanResend(false);
    } catch (err) {
      setFpErrs({ email: parseError(err) });
    } finally {
      setLoading(false);
    }
  };

  // OTP inputs handler
  const handleOtpChange = (index, value) => {
    const clean = value.replace(/\D/g, '');
    if (!clean && value !== '') return;

    const newOtp = [...fpOtp];

    // Handle paste of 6 digits
    if (clean.length > 1) {
      const pasted = clean.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pasted[i] || '';
      }
      setFpOtp(newOtp);
      const nextIndex = Math.min(clean.length, 5);
      otpInputs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = clean;
    setFpOtp(newOtp);

    // Auto focus next box
    if (clean && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !fpOtp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = fpOtp.join('');
    if (otpCode.length !== 6) {
      setFpErrs({ otp: 'يرجى إدخال رمز التحقق المكون من 6 أرقام بالكامل' });
      return;
    }

    setLoading(true);
    setFpErrs({});
    try {
      await authService.verifyOTP(fpEmail.trim().toLowerCase(), otpCode);
      toast.success('تم التحقق من هويتك بنجاح ✅');
      setFpStep(3);
    } catch (err) {
      setFpErrs({ otp: parseError(err) });
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const fe = {};
    const { isStrong } = checkPasswordStrength(fpPass);

    if (!fpPass) {
      fe.pass = 'كلمة المرور الجديدة مطلوبة';
    } else if (!isStrong) {
      fe.pass = 'كلمة المرور يجب أن تكون قوية (8 أحرف + حرف كبير + حرف صغير + رقم/رمز)';
    }

    if (!fpConfirmPass) {
      fe.confirm = 'يرجى تأكيد كلمة المرور';
    } else if (fpPass !== fpConfirmPass) {
      fe.confirm = 'كلمتا المرور غير متطابقتين';
    }

    if (Object.keys(fe).length) {
      setFpErrs(fe);
      return;
    }

    setLoading(true);
    setFpErrs({});
    try {
      const res = await authService.resetPassword({
        email: fpEmail.trim().toLowerCase(),
        otp: fpOtp.join(''),
        newPassword: fpPass,
      });

      const token = res?.data?.token || res?.token;
      if (token) {
        localStorage.setItem('authToken', token);
      }

      toast.success('تم تحديث كلمة المرور وتسجيل الدخول بنجاح! 🎉');
      navigate('/');
    } catch (err) {
      setFpErrs({ pass: parseError(err) });
    } finally {
      setLoading(false);
    }
  };

  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen flex" dir="rtl" style={{ background: '#f8f9fa' }}>
      {/* ── Left Side: Majestic Branding Panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 w-[520px] flex-shrink-0 relative overflow-hidden shadow-2xl"
        style={{ background: '#000e1f' }}
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Golden Gradient Glow Effect */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#c9952a]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#c9952a]/15 blur-3xl pointer-events-none" />

        {/* Top: Large Prominent Logo in Sidebar */}
        <div className="relative z-10 flex flex-col items-start gap-4">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-[#c9952a]/40 shadow-xl backdrop-blur-md group-hover:scale-105 transition-all">
              <img
                src={logo}
                alt="شعار مستقبل الفراعنة"
                className="h-16 w-auto object-contain filter drop-shadow-md brightness-0 invert"
              />
            </div>
            <div>
              <p className="text-white font-black text-[20px] tracking-wide">مستقبل الفراعنة</p>
              <p className="text-[12px] text-[#c9952a] font-semibold tracking-wider">PHARAOHS FUTURE REAL ESTATE</p>
            </div>
          </Link>
        </div>

        {/* Middle: Golden Slogan */}
        <div className="relative z-10 my-auto py-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(201,149,42,0.15)', border: '1px solid rgba(201,149,42,0.35)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#c9952a' }} />
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#c9952a]">
              بوابتك للاستثمار العقاري الفاخر
            </span>
          </div>

          <h2 className="text-white font-extrabold text-[38px] leading-tight mb-4">
            امتلك وحدتك في
            <br />
            <span className="bg-gradient-to-l from-[#c9952a] via-[#f1cb79] to-[#c9952a] bg-clip-text text-transparent">
              أرقى مشروعات مصر
            </span>
          </h2>
          <p className="text-white/70 text-[15px] leading-relaxed max-w-sm">
            نخبة من أرقى المشروعات السكنية والتجارية في القاهرة والتجمع وأسوان والعاصمة الإدارية بأعلى عائد استثماري.
          </p>
        </div>

        {/* Bottom: Statistics */}
        <div className="relative z-10 grid grid-cols-3 gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          {[
            { num: '500+', label: 'مشروع منجز' },
            { num: '15K+', label: 'عميل راضٍ' },
            { num: '98%', label: 'نسبة الرضا' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[22px] font-black text-white">{s.num}</p>
              <p className="text-[11px] text-white/60 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Side: Main Interactive Form Section ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-10 max-w-xl mx-auto w-full">
        {/* Large Prominent Logo Above Form */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="inline-block group mb-3">
            <div className="relative p-3 rounded-3xl bg-gradient-to-b from-[#000e1f] to-[#041d38] border-2 border-[#c9952a]/40 shadow-xl group-hover:scale-105 transition-transform duration-300">
              <img
                src={logo}
                alt="شعار مستقبل الفراعنة للاستثمار العقاري"
                className="h-20 sm:h-24 w-auto object-contain brightness-0 invert mx-auto filter drop-shadow-lg"
              />
            </div>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-[#c9952a]/30">
            <span className="w-2 h-2 rounded-full bg-[#c9952a]" />
            <span className="text-[12px] font-bold text-[#775a1a]">مستقبل الفراعنة للاستثمار العقاري</span>
          </div>
        </div>

        {/* ── Mode 1: Forgot Password Wizard ────────────────────────── */}
        {mode === 'forgot' ? (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xl">
            <button
              onClick={() => switchMode('login')}
              className="flex items-center gap-1.5 text-[13px] font-bold text-neutral-500 hover:text-neutral-800 mb-6 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              العودة لتسجيل الدخول
            </button>

            {/* Stepper Progress Indicator */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2 -z-0" />
              {[
                { s: 1, label: 'البريد الإلكتروني' },
                { s: 2, label: 'رمز التحقق (OTP)' },
                { s: 3, label: 'كلمة السر الجديدة' },
              ].map((step) => {
                const isActive = fpStep === step.s;
                const isPassed = fpStep > step.s;
                return (
                  <div key={step.s} className="relative z-10 flex flex-col items-center gap-1.5 bg-white px-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px] transition-all shadow-sm ${
                        isPassed
                          ? 'bg-green-600 text-white'
                          : isActive
                          ? 'bg-[#000e1f] text-white ring-4 ring-[#000e1f]/10'
                          : 'bg-neutral-200 text-neutral-500'
                      }`}
                    >
                      {isPassed ? (
                        <span className="material-symbols-outlined text-[18px]">check</span>
                      ) : (
                        step.s
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-bold ${
                        isActive ? 'text-[#000e1f]' : isPassed ? 'text-green-600' : 'text-neutral-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step 1: Request OTP (ONLY Email input! No password!) */}
            {fpStep === 1 && (
              <div>
                <div className="mb-6">
                  <h1 className="text-[22px] font-black text-[#000e1f] mb-1">استعادة كلمة المرور</h1>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">
                    أدخل بريدك الإلكتروني المسجّل لدينا فقط، وسنرسل لك رمز تحقق مؤلفاً من 6 أرقام للتأكد من هويتك.
                  </p>
                </div>

                <form onSubmit={handleRequestOtp} className="flex flex-col gap-4" noValidate>
                  <Field
                    label="البريد الإلكتروني المسجّل *"
                    icon="mail"
                    type="email"
                    value={fpEmail}
                    onChange={(v) => {
                      setFpEmail(v);
                      setFpErrs((p) => ({ ...p, email: '' }));
                    }}
                    placeholder="example@email.com"
                    error={fpErrs.email}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl font-bold text-[15px] text-white mt-2 disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg active:scale-[0.98]"
                    style={{ background: '#000e1f' }}
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        جارٍ إرسال رمز التحقق...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">send</span>
                        إرسال رمز التحقق (OTP)
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Enter & Verify 6-digit OTP (NO password!) */}
            {fpStep === 2 && (
              <div>
                <div className="mb-6">
                  <h1 className="text-[22px] font-black text-[#000e1f] mb-1">رمز التحقق (OTP)</h1>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">
                    تم إرسال رمز التحقق إلى بريدك الإلكتروني:
                    <br />
                    <span className="font-bold text-[#000e1f] font-mono">{fpEmail}</span>
                    <button
                      type="button"
                      onClick={() => setFpStep(1)}
                      className="text-[12px] text-[#775a1a] mr-2 underline hover:text-[#5a4413] font-semibold"
                    >
                      تعديل البريد
                    </button>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-neutral-700 text-center">
                      أدخل رمز التحقق (6 أرقام)
                    </label>
                    <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
                      {fpOtp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (otpInputs.current[idx] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className={`w-11 sm:w-12 h-14 text-center text-[24px] font-extrabold font-mono rounded-xl border outline-none transition-all shadow-sm ${
                            digit
                              ? 'border-[#c9952a] bg-amber-50/30 text-[#000e1f] ring-2 ring-[#c9952a]/20'
                              : 'border-neutral-300 bg-neutral-50 focus:border-[#c9952a] focus:bg-white'
                          }`}
                        />
                      ))}
                    </div>
                    {fpErrs.otp && (
                      <p className="text-[12px] text-red-600 text-center mt-1 flex items-center justify-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[15px]">error</span>
                        {fpErrs.otp}
                      </p>
                    )}
                  </div>

                  {/* Resend Countdown */}
                  <div className="text-center text-[13px] text-neutral-500">
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={loading}
                        className="font-bold text-[#775a1a] hover:underline"
                      >
                        إعادة إرسال رمز جديد الآن
                      </button>
                    ) : (
                      <span>
                        يمكنك إعادة طلب الرمز خلال{' '}
                        <span className="font-bold font-mono text-[#000e1f]">{fpCountdown}</span> ثانية
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || fpOtp.join('').length !== 6}
                    className="w-full h-12 rounded-xl font-bold text-[15px] text-white mt-1 disabled:opacity-50 flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg active:scale-[0.98]"
                    style={{ background: '#000e1f' }}
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        جارٍ التحقق من الرمز...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">verified</span>
                        تأكيد رمز التحقق
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: Enter New Password (ONLY after OTP is verified!) */}
            {fpStep === 3 && (
              <div>
                <div className="mb-6">
                  <h1 className="text-[22px] font-black text-[#000e1f] mb-1">تعيين كلمة المرور الجديدة</h1>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">
                    تم التحقق من هويتك بنجاح. يرجى إنشاء كلمة مرور قوية وجديدة لحسابك.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                  {/* New Password */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-neutral-800">كلمة المرور الجديدة *</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[20px] text-neutral-400">
                        lock
                      </span>
                      <input
                        type={fpShowPass ? 'text' : 'password'}
                        value={fpPass}
                        onChange={(e) => {
                          setFpPass(e.target.value);
                          setFpErrs((p) => ({ ...p, pass: '' }));
                        }}
                        placeholder="8 أحرف + أحرف كبيرة وصغيرة وأرقام"
                        className="w-full h-12 pr-11 pl-11 rounded-xl text-[14px] outline-none transition-all border border-neutral-300 bg-neutral-50 focus:border-[#c9952a] focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setFpShowPass(!fpShowPass)}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {fpShowPass ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {fpErrs.pass && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[13px]">error</span>
                        {fpErrs.pass}
                      </p>
                    )}
                    <PasswordStrengthMeter password={fpPass} />
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-neutral-800">تأكيد كلمة المرور الجديدة *</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[20px] text-neutral-400">
                        lock_clock
                      </span>
                      <input
                        type={fpShowPass ? 'text' : 'password'}
                        value={fpConfirmPass}
                        onChange={(e) => {
                          setFpConfirmPass(e.target.value);
                          setFpErrs((p) => ({ ...p, confirm: '' }));
                        }}
                        placeholder="أعد إدخال كلمة المرور للتأكيد"
                        className="w-full h-12 pr-11 pl-4 rounded-xl text-[14px] outline-none transition-all border border-neutral-300 bg-neutral-50 focus:border-[#c9952a] focus:bg-white"
                      />
                    </div>
                    {fpConfirmPass && (
                      <p
                        className={`text-[11px] flex items-center gap-1 font-bold ${
                          fpPass === fpConfirmPass ? 'text-green-600' : 'text-red-500'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {fpPass === fpConfirmPass ? 'check_circle' : 'cancel'}
                        </span>
                        {fpPass === fpConfirmPass ? 'كلمتا المرور متطابقتان تماماً' : 'كلمتا المرور غير متطابقتين'}
                      </p>
                    )}
                    {fpErrs.confirm && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[13px]">error</span>
                        {fpErrs.confirm}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !checkPasswordStrength(fpPass).isStrong || fpPass !== fpConfirmPass}
                    className="w-full h-12 rounded-xl font-bold text-[15px] text-white mt-3 disabled:opacity-50 flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg active:scale-[0.98]"
                    style={{ background: '#000e1f' }}
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        جارٍ حفظ كلمة المرور وتسجيل الدخول...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                        حفظ كلمة المرور وتسجيل الدخول
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* ── Mode 2 & 3: Login & Sign Up Screens ───────────────────── */
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xl">
            {/* Elegant Luxury Tabs */}
            <div className="flex bg-neutral-100 rounded-2xl p-1 mb-8">
              {[
                ['login', 'تسجيل الدخول'],
                ['register', 'إنشاء حساب جديد'],
              ].map(([m, lbl]) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`flex-1 h-11 rounded-xl text-[14px] font-bold transition-all ${
                    mode === m
                      ? 'bg-white shadow-md text-[#000e1f] border border-neutral-200/50'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>

            {/* Screen Header */}
            <div className="mb-6">
              <h1 className="text-[24px] font-black text-[#000e1f] mb-1">
                {isLogin ? 'مرحباً بعودتك!' : 'انضم إلى نخبة عملائنا'}
              </h1>
              <p className="text-[13px] text-neutral-500 leading-relaxed">
                {isLogin
                  ? 'أدخل بريدك الإلكتروني وكلمة المرور لمتابعة حجوزاتك العقارية'
                  : 'سجّل بياناتك الآن للبدء في حجز واستعراض أفخم مشروعات مصر'}
              </p>
            </div>

            {/* API Error Alert Box */}
            {apiError && (
              <div
                className="flex items-start gap-3 p-4 rounded-2xl mb-5 text-[13px] shadow-sm animate-in fade-in"
                style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
              >
                <span className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5">error</span>
                <div className="flex-1">
                  <p className="font-bold mb-0.5">تنبيه:</p>
                  <p className="opacity-90">{apiError}</p>
                </div>
                <button onClick={() => setApiError('')} className="opacity-60 hover:opacity-100">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {!isLogin && (
                <Field
                  label="الاسم الكامل *"
                  icon="person"
                  value={name}
                  onChange={(v) => {
                    setName(v);
                    clearErr('name');
                  }}
                  placeholder="محمد أحمد"
                  error={errs.name}
                />
              )}

              <Field
                label="البريد الإلكتروني *"
                icon="mail"
                type="email"
                value={email}
                onChange={(v) => {
                  setEmail(v);
                  clearErr('email');
                }}
                placeholder="example@email.com"
                error={errs.email}
              />

              {!isLogin && (
                <Field
                  label="رقم الهاتف (مصر) *"
                  icon="call"
                  type="tel"
                  value={phone}
                  maxLength={11}
                  showCounter={true}
                  onChange={handlePhoneChange}
                  placeholder="01012345678"
                  error={errs.phone}
                  hint="11 رقماً فقط يبدأ بـ (010 / 011 / 012 / 015)"
                />
              )}

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-neutral-800">كلمة المرور *</label>
                <div className="relative">
                  <span
                    className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[20px]"
                    style={{ color: errs.password ? '#dc2626' : '#9ca3af' }}
                  >
                    lock
                  </span>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearErr('password');
                    }}
                    placeholder={isLogin ? 'أدخل كلمة المرور الخاصة بحسابك' : '8 أحرف + أحرف كبيرة وصغيرة وأرقام'}
                    className="w-full h-12 pr-11 pl-11 rounded-xl text-[14px] outline-none transition-all shadow-sm"
                    style={{
                      border: errs.password ? '1.5px solid #dc2626' : '1.5px solid #e5e7eb',
                      background: errs.password ? '#fef2f2' : '#f9fafb',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {errs.password && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-0.5">
                    <span className="material-symbols-outlined text-[13px]">error</span>
                    {errs.password}
                  </p>
                )}
                {!isLogin && <PasswordStrengthMeter password={password} />}
              </div>

              {/* Forgot Password Link on Login Screen */}
              {isLogin && (
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-[13px] font-bold text-[#775a1a] hover:text-[#5a4413] hover:underline transition-colors"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl font-bold text-[15px] text-white mt-2 disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg active:scale-[0.98]"
                style={{ background: '#000e1f' }}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isLogin ? 'جارٍ تسجيل الدخول...' : 'جارٍ إنشاء الحساب...'}
                  </>
                ) : isLogin ? (
                  <>
                    <span className="material-symbols-outlined text-[20px]">login</span>
                    تسجيل الدخول
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                    إنشاء حساب جديد
                  </>
                )}
              </button>
            </form>

            {/* Bottom Mode Switch Link */}
            <p className="text-center text-[13px] text-neutral-600 mt-6 font-medium">
              {isLogin ? 'ليس لديك حساب بعد؟' : 'لديك حساب مسجل بالفعل؟'}{' '}
              <button
                onClick={() => switchMode(isLogin ? 'register' : 'login')}
                className="font-black hover:underline mr-1"
                style={{ color: '#775a1a' }}
              >
                {isLogin ? 'أنشئ حسابك الآن مجاناً' : 'سجّل الدخول لحسابك'}
              </button>
            </p>

            <div className="mt-8 pt-5 border-t border-neutral-100 text-center">
              <p className="text-[11px] text-neutral-400">
                تسجيلك في المنصة يعني موافقتك على{' '}
                <span className="underline cursor-pointer hover:text-neutral-600">شروط الاستخدام</span> و{' '}
                <span className="underline cursor-pointer hover:text-neutral-600">سياسة الخصوصية</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}