import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';
import authService from '@services/auth.service.js';
import logo from '@assets/images/logo.png';
import bgImg from '@assets/images/Aswan Sunset Waterfront with Luxury Resort Branding.png';
import toast from 'react-hot-toast';

const DARK = '#000e1f';

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
  const { score } = checkPasswordStrength(password);
  const levels = [
    { label: 'ضعيفة',  color: '#ef4444' },
    { label: 'مقبولة', color: '#f59e0b' },
    { label: 'جيدة',   color: '#3b82f6' },
    { label: 'قوية',   color: '#16a34a' },
  ];
  const cur = levels[Math.max(0, score - 1)] || levels[0];
  return (
    <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 99, width: `${(score / 4) * 100}%`, background: cur.color, transition: 'width 0.3s, background 0.3s' }} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: cur.color, whiteSpace: 'nowrap' }}>{cur.label}</span>
    </div>
  );
}

function Field({ label, icon, type = 'text', value, onChange, placeholder, hint = '', error = '', maxLength, showCounter = false }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{label}</label>
        {showCounter && maxLength && (
          <span style={{ fontSize: 10, fontFamily: 'monospace', padding: '1px 6px', borderRadius: 5, background: value.length === maxLength ? 'rgba(22,163,74,0.3)' : 'rgba(255,255,255,0.12)', color: value.length === maxLength ? '#4ade80' : 'rgba(255,255,255,0.55)', fontWeight: 700 }}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <span className="material-symbols-outlined"
          style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: error ? '#f87171' : focused ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}>
          {icon}
        </span>
        <input
          type={type} value={value} maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: '100%', height: 42, paddingRight: 38, paddingLeft: 12,
            borderRadius: 10, fontSize: 13, outline: 'none', fontFamily: 'inherit',
            background: error ? 'rgba(239,68,68,0.15)' : focused ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)',
            border: error ? '1.5px solid rgba(248,113,113,0.7)' : focused ? '1.5px solid rgba(255,255,255,0.55)' : '1.5px solid rgba(255,255,255,0.2)',
            color: '#fff',
            boxShadow: focused ? '0 0 0 3px rgba(255,255,255,0.07)' : 'none',
            transition: 'all 0.2s',
            boxSizing: 'border-box',
          }}
        />
      </div>
      {error && <p style={{ fontSize: 10, color: '#f87171', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 12 }}>error</span>{error}
      </p>}
      {!error && hint && <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{hint}</p>}
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

  // ─── Shared visual tokens ──────────────────────────────────────
  const ACCENT = '#000e1f';
  const GOLD   = '#c9952a';

  const btn = (disabled = false) => ({
    width: '100%', height: 44, borderRadius: 10,
    fontWeight: 700, fontSize: 14, color: '#fff',
    background: disabled ? 'rgba(255,255,255,0.2)' : ACCENT,
    border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    boxShadow: disabled ? 'none' : '0 4px 20px rgba(0,14,31,0.45)',
    transition: 'opacity 0.2s, background 0.2s',
    fontFamily: 'inherit', opacity: disabled ? 0.5 : 1,
  });

  const passInput = (hasErr) => ({
    width: '100%', height: 42, paddingRight: 38, paddingLeft: 38,
    borderRadius: 10, fontSize: 13, outline: 'none', fontFamily: 'inherit',
    background: hasErr ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.1)',
    border: hasErr ? '1.5px solid rgba(248,113,113,0.7)' : '1.5px solid rgba(255,255,255,0.2)',
    color: '#fff', transition: 'all 0.2s', boxSizing: 'border-box',
  });

  const errRow = (msg) => msg ? (
    <p style={{ fontSize: 10, color: '#f87171', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600, margin: 0 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>error</span>{msg}
    </p>
  ) : null;

  const iconBtn = (icon, onClick, title) => (
    <button type="button" onClick={onClick} title={title}
      style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', padding: 0 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icon}</span>
    </button>
  );

  const spinner = (
    <span style={{ width: 17, height: 17, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'auth-spin 0.8s linear infinite', flexShrink: 0 }} />
  );

  // ─── Stepper for Forgot Password ─────────────────────────────
  const Stepper = () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 20, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 13, right: 14, left: 14, height: 2, background: 'rgba(255,255,255,0.15)', zIndex: 0 }} />
      {[{ s: 1, lbl: 'البريد' }, { s: 2, lbl: 'الرمز' }, { s: 3, lbl: 'كلمة المرور' }].map(({ s, lbl }) => {
        const active = fpStep === s, passed = fpStep > s;
        return (
          <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800,
              background: passed ? '#16a34a' : active ? '#fff' : 'rgba(255,255,255,0.15)',
              color: passed ? '#fff' : active ? ACCENT : 'rgba(255,255,255,0.5)',
              boxShadow: active ? '0 0 0 4px rgba(255,255,255,0.15)' : 'none',
              transition: 'all 0.3s',
            }}>
              {passed ? <span className="material-symbols-outlined" style={{ fontSize: 15 }}>check</span> : s}
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: active ? '#fff' : passed ? '#4ade80' : 'rgba(255,255,255,0.4)' }}>{lbl}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ── Global + animation styles ── */}
      <style>{`
        @keyframes auth-spin { to { transform: rotate(360deg); } }
        .auth-input::placeholder { color: rgba(255,255,255,0.28) !important; }
        /* Card right-aligned on desktop, centered on mobile */
        .auth-outer {
          position: fixed; inset: 0; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cairo','Tajawal',sans-serif;
        }
        .auth-col {
          position: relative; z-index: 2;
          width: 100%; max-width: 400px;
          max-height: 100dvh;
          overflow-y: auto; overflow-x: hidden;
          padding: 20px 16px;
          display: flex; flex-direction: column; align-items: center;
        }
        @media (min-width: 768px) {
          .auth-outer { justify-content: center; }
          .auth-col { transform: translateX(-15vw); }
        }
      `}</style>

      <div dir="rtl" className="auth-outer">

        {/* ── Background image ── */}
        <img src={bgImg} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 40%', zIndex: 0,
        }} />

        {/* ── Overlay ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to left, rgba(0,14,31,0.82) 0%, rgba(0,14,31,0.55) 45%, rgba(0,14,31,0.15) 100%)',
        }} />

        {/* ── Scrollable card column ── */}
        <div className="auth-col">

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18, gap: 6 }}>
            <img src={logo} alt="مستقبل الفراعنة" style={{ height: 62, width: 'auto', filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.55))' }} />
            <span style={{ color: '#fff', fontSize: 18, fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.6)', textAlign: 'center' }}>مستقبل الفراعنة</span>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 9, fontWeight: 600, letterSpacing: '0.22em' }}>PHARAOHS FUTURE</span>
          </Link>

          {/* ════════════════════════════════════
              FORGOT PASSWORD — 3-step wizard
          ════════════════════════════════════ */}
          {mode === 'forgot' ? (
            <div style={{
              width: '100%',
              background: 'rgba(0,14,31,0.60)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 18, border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)', overflow: 'hidden',
            }}>
              {/* gold top stripe */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${GOLD}, rgba(201,149,42,0.5), ${GOLD})` }} />

              <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                {/* back button */}
                <button onClick={() => switchMode('login')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: 600, marginBottom: 16, padding: 0, fontFamily: 'inherit' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                  العودة لتسجيل الدخول
                </button>

                <Stepper />

                {/* ── Step 1: Email ── */}
                {fpStep === 1 && (
                  <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: 14 }} noValidate>
                    <div>
                      <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>استعادة كلمة المرور</h1>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                        أدخل بريدك المسجّل وسنرسل رمز تحقق من 6 أرقام.
                      </p>
                    </div>
                    <Field label="البريد الإلكتروني *" icon="mail" type="email"
                      value={fpEmail} onChange={(v) => { setFpEmail(v); setFpErrs(p => ({ ...p, email: '' })); }}
                      placeholder="example@email.com" error={fpErrs.email} />
                    <button type="submit" disabled={loading} style={btn(loading)}>
                      {loading ? <>{spinner}جارٍ الإرسال...</> : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>إرسال رمز التحقق</>}
                    </button>
                  </form>
                )}

                {/* ── Step 2: OTP ── */}
                {fpStep === 2 && (
                  <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                      <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>رمز التحقق</h1>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, margin: 0 }}>
                        أُرسل الرمز إلى <strong style={{ color: '#fff' }}>{fpEmail}</strong>
                        <button type="button" onClick={() => setFpStep(1)}
                          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', fontSize: 11, cursor: 'pointer', fontWeight: 700, marginRight: 6, textDecoration: 'underline', fontFamily: 'inherit' }}>
                          تعديل
                        </button>
                      </p>
                    </div>
                    {/* OTP boxes */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }} dir="ltr">
                      {fpOtp.map((digit, idx) => (
                        <input key={idx} ref={el => (otpInputs.current[idx] = el)}
                          type="text" inputMode="numeric" maxLength={1} value={digit}
                          onChange={e => handleOtpChange(idx, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(idx, e)}
                          className="auth-input"
                          style={{
                            width: 42, height: 50, textAlign: 'center', fontSize: 22, fontWeight: 800,
                            fontFamily: 'monospace', borderRadius: 10, outline: 'none',
                            border: digit ? '2px solid rgba(255,255,255,0.7)' : '2px solid rgba(255,255,255,0.2)',
                            background: digit ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                            color: '#fff', transition: 'all 0.15s', boxSizing: 'border-box',
                          }} />
                      ))}
                    </div>
                    {errRow(fpErrs.otp)}
                    <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                      {canResend
                        ? <button type="button" onClick={handleRequestOtp} disabled={loading}
                            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontWeight: 700, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', textDecoration: 'underline' }}>
                            إعادة إرسال رمز جديد
                          </button>
                        : <span>إعادة الإرسال خلال <strong style={{ color: '#fff', fontFamily: 'monospace' }}>{fpCountdown}</strong> ثانية</span>}
                    </div>
                    <button type="submit" disabled={loading || fpOtp.join('').length !== 6} style={btn(loading || fpOtp.join('').length !== 6)}>
                      {loading ? <>{spinner}جارٍ التحقق...</> : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>verified</span>تأكيد الرمز</>}
                    </button>
                  </form>
                )}

                {/* ── Step 3: New Password ── */}
                {fpStep === 3 && (
                  <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>كلمة المرور الجديدة</h1>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, margin: 0 }}>تم التحقق بنجاح ✅ أنشئ كلمة مرور قوية.</p>
                    </div>
                    {/* new pass */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>كلمة المرور الجديدة *</label>
                      <div style={{ position: 'relative' }}>
                        <span className="material-symbols-outlined" style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>lock</span>
                        <input type={fpShowPass ? 'text' : 'password'} value={fpPass} className="auth-input"
                          onChange={e => { setFpPass(e.target.value); setFpErrs(p => ({ ...p, pass: '' })); }}
                          placeholder="كلمة المرور الجديدة" style={passInput(!!fpErrs.pass)} />
                        {iconBtn(fpShowPass ? 'visibility_off' : 'visibility', () => setFpShowPass(v => !v))}
                      </div>
                      {errRow(fpErrs.pass)}
                      <PasswordStrengthMeter password={fpPass} />
                    </div>
                    {/* confirm pass */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>تأكيد كلمة المرور *</label>
                      <div style={{ position: 'relative' }}>
                        <span className="material-symbols-outlined" style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>lock_clock</span>
                        <input type={fpShowPass ? 'text' : 'password'} value={fpConfirmPass} className="auth-input"
                          onChange={e => { setFpConfirmPass(e.target.value); setFpErrs(p => ({ ...p, confirm: '' })); }}
                          placeholder="تأكيد كلمة المرور"
                          style={{ ...passInput(!!fpErrs.confirm), paddingLeft: 12, border: fpConfirmPass && fpPass === fpConfirmPass ? '1.5px solid rgba(74,222,128,0.6)' : passInput(!!fpErrs.confirm).border }} />
                      </div>
                      {fpConfirmPass && (
                        <p style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 3, fontWeight: 700, color: fpPass === fpConfirmPass ? '#4ade80' : '#f87171', margin: 0 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 12 }}>{fpPass === fpConfirmPass ? 'check_circle' : 'cancel'}</span>
                          {fpPass === fpConfirmPass ? 'كلمتا المرور متطابقتان' : 'كلمتا المرور غير متطابقتين'}
                        </p>
                      )}
                      {errRow(fpErrs.confirm)}
                    </div>
                    <button type="submit"
                      disabled={loading || !checkPasswordStrength(fpPass).isStrong || fpPass !== fpConfirmPass}
                      style={{ ...btn(loading || !checkPasswordStrength(fpPass).isStrong || fpPass !== fpConfirmPass), marginTop: 4 }}>
                      {loading ? <>{spinner}جارٍ الحفظ...</> : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>lock_reset</span>حفظ كلمة المرور</>}
                    </button>
                  </form>
                )}
              </div>
            </div>

          ) : (
            /* ════════════════════════════════════
                LOGIN / REGISTER
            ════════════════════════════════════ */
            <div style={{
              width: '100%',
              background: 'rgba(0,14,31,0.60)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 18, border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)', overflow: 'hidden',
            }}>
              {/* gold top stripe */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${GOLD}, rgba(201,149,42,0.5), ${GOLD})` }} />

              <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* heading */}
                <div>
                  <h1 style={{ color: '#fff', fontSize: 19, fontWeight: 800, margin: '0 0 3px' }}>
                    {isLogin ? 'مرحباً بكم مجدداً' : 'إنشاء حساب جديد'}
                  </h1>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: 0 }}>
                    {isLogin ? 'سعداء بعودتك — لنبنِ مستقبلاً أفضل معاً' : 'انضم إلى رحلتنا نحو مستقبل عقاري أفضل'}
                  </p>
                </div>

                {/* tabs */}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: 3 }}>
                  {[['login', 'تسجيل الدخول'], ['register', 'إنشاء حساب']].map(([m, lbl]) => (
                    <button key={m} type="button" onClick={() => switchMode(m)} style={{
                      flex: 1, height: 34, borderRadius: 8, border: 'none', cursor: 'pointer',
                      fontSize: 13, fontWeight: 700, transition: 'all 0.2s', fontFamily: 'inherit',
                      background: mode === m ? ACCENT : 'transparent',
                      color: mode === m ? '#fff' : 'rgba(255,255,255,0.4)',
                      boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.4)' : 'none',
                    }}>{lbl}</button>
                  ))}
                </div>

                {/* API error */}
                {apiError && (
                  <div style={{ background: 'rgba(239,68,68,0.18)', border: '1px solid rgba(248,113,113,0.4)', borderRadius: 10, padding: '10px 12px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span className="material-symbols-outlined" style={{ color: '#f87171', fontSize: 18, flexShrink: 0 }}>error</span>
                    <p style={{ fontSize: 12, color: '#fca5a5', margin: 0, flex: 1 }}>{apiError}</p>
                    <button type="button" onClick={() => setApiError('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', opacity: 0.7, padding: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
                    </button>
                  </div>
                )}

                {/* form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 11 }} noValidate>
                  {!isLogin && (
                    <Field label="الاسم الكامل *" icon="person" value={name}
                      onChange={v => { setName(v); clearErr('name'); }}
                      placeholder="اسمك الكامل" error={errs.name} />
                  )}
                  <Field label="البريد الإلكتروني *" icon="mail" type="email" value={email}
                    onChange={v => { setEmail(v); clearErr('email'); }}
                    placeholder="example@domain.com" error={errs.email} />
                  {!isLogin && (
                    <Field label="رقم الهاتف *" icon="call" type="tel" value={phone}
                      maxLength={11} showCounter onChange={handlePhoneChange}
                      placeholder="01XXXXXXXXX" error={errs.phone}
                      hint="11 رقماً يبدأ بـ 010 / 011 / 012 / 015" />
                  )}

                  {/* password field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>كلمة المرور *</label>
                      {isLogin && (
                        <button type="button" onClick={() => switchMode('forgot')}
                          style={{ background: 'none', border: 'none', fontSize: 11, color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit', textDecoration: 'underline' }}>
                          نسيت كلمة المرور؟
                        </button>
                      )}
                    </div>
                    <div style={{ position: 'relative' }}>
                      <span className="material-symbols-outlined" style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: errs.password ? '#f87171' : 'rgba(255,255,255,0.4)' }}>lock</span>
                      <input type={showPass ? 'text' : 'password'} value={password} className="auth-input"
                        onChange={e => { setPassword(e.target.value); clearErr('password'); }}
                        placeholder="كلمة المرور"
                        style={passInput(!!errs.password)} />
                      {iconBtn(showPass ? 'visibility_off' : 'visibility', () => setShowPass(v => !v))}
                    </div>
                    {errRow(errs.password)}
                    {!isLogin && <PasswordStrengthMeter password={password} />}
                  </div>

                  <button type="submit" disabled={loading} style={{ ...btn(loading), marginTop: 4 }}>
                    {loading
                      ? <>{spinner}{isLogin ? 'جارٍ تسجيل الدخول...' : 'جارٍ إنشاء الحساب...'}</>
                      : isLogin
                        ? <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>← تسجيل الدخول</>
                        : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span>إنشاء الحساب</>}
                  </button>
                </form>

                {/* switch mode */}
                <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                  {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
                  <button type="button" onClick={() => switchMode(isLogin ? 'register' : 'login')}
                    style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', textDecoration: 'underline' }}>
                    {isLogin ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Privacy */}
          <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 14, marginBottom: 4 }}>
            بتسجيلك توافق على{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>شروط الاستخدام</span>
            {' '}و{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>سياسة الخصوصية</span>
          </p>
        </div>
      </div>
    </>
  );
}
