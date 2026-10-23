import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';
import { useLanguage } from '@context/LanguageContext.jsx';
import authService from '@services/auth.service.js';
import logo from '@assets/images/really-logo.png';
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

function PasswordStrengthMeter({ password, t }) {
  if (!password) return null;
  const { score } = checkPasswordStrength(password);
  const levels = [
    { label: t ? t('auth.strengthWeak', 'ضعيفة') : 'ضعيفة',   color: '#ef4444' },
    { label: t ? t('auth.strengthFair', 'مقبولة') : 'مقبولة', color: '#f59e0b' },
    { label: t ? t('auth.strengthGood', 'جيدة') : 'جيدة',    color: '#3b82f6' },
    { label: t ? t('auth.strengthStrong', 'قوية') : 'قوية',   color: '#16a34a' },
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

function Field({ label, icon, type = 'text', value, onChange, placeholder, hint = '', error = '', maxLength, showCounter = false, isRTL = true }) {
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
          style={{
            position: 'absolute',
            ...(isRTL ? { right: 11 } : { left: 11 }),
            top: '50%', transform: 'translateY(-50%)',
            fontSize: 18,
            color: error ? '#f87171' : focused ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
            transition: 'color 0.2s',
          }}>
          {icon}
        </span>
        <input
          type={type} value={value} maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: '100%', height: 42,
            paddingRight: isRTL ? 38 : 12,
            paddingLeft: isRTL ? 12 : 38,
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
  const { t, isRTL, dir } = useLanguage();

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
    if (msg.includes('email') || msg.includes('البريد')) return t('auth.errEmailTaken', 'هذا البريد الإلكتروني مسجّل مسبقاً أو غير صحيح');
    if (msg.includes('password') || msg.includes('كلمة') || msg.includes('Invalid')) return t('auth.errInvalidCreds', 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
    if (msg.includes('هاتف') || msg.includes('phone')) return msg;
    if (msg.includes('رمز') || msg.includes('OTP') || msg.includes('otp')) return msg;
    if (msg.includes('Network') || msg.includes('ECONNREFUSED')) return t('auth.errNetwork', 'تعذّر الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت');
    return msg || t('auth.errGeneric', 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
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
      if (!name.trim()) e.name = t('auth.errNameReq', 'الاسم الكامل مطلوب');
      else if (name.trim().length < 2) e.name = t('auth.errNameShort', 'الاسم يجب أن يكون حرفين على الأقل');
    }

    if (!email.trim()) {
      e.email = t('auth.errEmailReq', 'البريد الإلكتروني مطلوب');
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      e.email = t('auth.errEmailInvalid', 'يرجى إدخال بريد إلكتروني صحيح');
    }

    if (mode === 'register') {
      if (!phone.trim()) {
        e.phone = t('auth.errPhoneReq', 'رقم الهاتف مطلوب');
      } else if (phone.length !== 11) {
        e.phone = isRTL
          ? `رقم الهاتف يجب أن يتكون من 11 رقماً بالضبط (أدخلت ${phone.length} رقماً)`
          : `Phone number must be exactly 11 digits (you entered ${phone.length})`;
      } else if (!isEgPhone(phone)) {
        e.phone = t('auth.errPhonePrefix', 'رقم الهاتف يجب أن يبدأ بـ (010 أو 011 أو 012 أو 015)');
      }
    }

    if (!password) {
      e.password = t('auth.errPassReq', 'كلمة المرور مطلوبة');
    } else if (mode === 'register') {
      const { isStrong } = checkPasswordStrength(password);
      if (!isStrong) {
        e.password = t('auth.errPassStrong', 'كلمة المرور يجب أن تكون قوية (8 أحرف + حرف كبير + حرف صغير + رقم/رمز)');
      }
    }

    setErrs(e);
    return Object.keys(e).length === 0;
  }, [mode, name, email, phone, password, t, isRTL]);

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
      if (msg.includes('كلمة') || msg.includes('password') || msg.includes('الدخول') || msg.includes('Invalid')) {
        setErrs((p) => ({ ...p, password: t('auth.errInvalidCreds', 'البريد الإلكتروني أو كلمة المرور غير صحيحة') }));
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── 3-Step Forgot Password Handlers ─────────────────────────

  // Step 1: Request OTP via Email
  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    const fe = {};
    if (!fpEmail.trim()) {
      fe.email = t('auth.errEmailReq', 'البريد الإلكتروني مطلوب');
    } else if (!/^\S+@\S+\.\S+$/.test(fpEmail.trim())) {
      fe.email = t('auth.errEmailInvalid', 'يرجى إدخال بريد إلكتروني صحيح');
    }
    if (Object.keys(fe).length) {
      setFpErrs(fe);
      return;
    }

    setLoading(true);
    setFpErrs({});
    try {
      await authService.forgotPassword(fpEmail.trim().toLowerCase());
      toast.success(isRTL ? 'تم إرسال رمز التحقق إلى بريدك الإلكتروني بنجاح 📩' : 'Verification code sent to your email 📩');
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
      setFpErrs({ otp: t('auth.errOtpLen', 'يرجى إدخال رمز التحقق المكون من 6 أرقام بالكامل') });
      return;
    }

    setLoading(true);
    setFpErrs({});
    try {
      await authService.verifyOTP(fpEmail.trim().toLowerCase(), otpCode);
      toast.success(isRTL ? 'تم التحقق من هويتك بنجاح ✅' : 'Identity verified successfully ✅');
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
      fe.pass = t('auth.errPassReq', 'كلمة المرور الجديدة مطلوبة');
    } else if (!isStrong) {
      fe.pass = t('auth.errPassStrong', 'كلمة المرور يجب أن تكون قوية (8 أحرف + حرف كبير + حرف صغير + رقم/رمز)');
    }

    if (!fpConfirmPass) {
      fe.confirm = t('auth.errPassConfirm', 'يرجى تأكيد كلمة المرور');
    } else if (fpPass !== fpConfirmPass) {
      fe.confirm = t('auth.passMismatch', 'كلمتا المرور غير متطابقتين');
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

      toast.success(isRTL ? 'تم تحديث كلمة المرور وتسجيل الدخول بنجاح! 🎉' : 'Password updated & logged in successfully! 🎉');
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
    width: '100%', height: 42,
    paddingRight: 38, paddingLeft: 38,
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
      style={{
        position: 'absolute',
        ...(isRTL ? { left: 11 } : { right: 11 }),
        top: '50%', transform: 'translateY(-50%)',
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'rgba(255,255,255,0.45)', padding: 0
      }}>
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
      {[
        { s: 1, lbl: t('auth.stepEmail', 'البريد') },
        { s: 2, lbl: t('auth.stepOtp', 'الرمز') },
        { s: 3, lbl: t('auth.stepPass', 'كلمة المرور') },
      ].map(({ s, lbl }) => {
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
        .auth-outer {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px 60px;
          overflow: clip;
          font-family: inherit;
        }
        .auth-col {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
        }
      `}</style>

      <div dir={dir} className="auth-outer">

        {/* ── Background image ── */}
        <img src={bgImg} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 40%', zIndex: 0,
        }} />

        {/* ── Overlay ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: isRTL
            ? 'linear-gradient(to left, rgba(0,14,31,0.82) 0%, rgba(0,14,31,0.55) 45%, rgba(0,14,31,0.15) 100%)'
            : 'linear-gradient(to right, rgba(0,14,31,0.82) 0%, rgba(0,14,31,0.55) 45%, rgba(0,14,31,0.15) 100%)',
        }} />

        {/* ── Scrollable card column ── */}
        <div className="auth-col">

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
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 700, marginBottom: 16, padding: 0, fontFamily: 'inherit' }}>
                  <span className={`material-symbols-outlined ${!isRTL ? 'rotate-180' : ''}`} style={{ fontSize: 16 }}>
                    arrow_forward
                  </span>
                  {t('auth.backToLogin', 'العودة لتسجيل الدخول')}
                </button>

                <Stepper />

                {/* ── Step 1: Email ── */}
                {fpStep === 1 && (
                  <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: 14 }} noValidate>
                    <div>
                      <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>
                        {t('auth.forgotTitle', 'استعادة كلمة المرور')}
                      </h1>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                        {t('auth.forgotSub', 'أدخل بريدك المسجّل وسنرسل رمز تحقق من 6 أرقام.')}
                      </p>
                    </div>
                    <Field
                      label={t('auth.email', 'البريد الإلكتروني *')}
                      icon="mail"
                      type="email"
                      value={fpEmail}
                      onChange={(v) => { setFpEmail(v); setFpErrs(p => ({ ...p, email: '' })); }}
                      placeholder={t('auth.emailPlaceholder', 'example@email.com')}
                      error={fpErrs.email}
                      isRTL={isRTL}
                    />
                    <button type="submit" disabled={loading} style={btn(loading)}>
                      {loading
                        ? <>{spinner}{t('auth.sendingOtp', 'جارٍ الإرسال...')}</>
                        : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>{t('auth.sendOtp', 'إرسال رمز التحقق')}</>}
                    </button>
                  </form>
                )}

                {/* ── Step 2: OTP ── */}
                {fpStep === 2 && (
                  <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                      <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>
                        {t('auth.otpTitle', 'رمز التحقق')}
                      </h1>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, margin: 0 }}>
                        {t('auth.otpSentTo', 'أُرسل الرمز إلى')} <strong style={{ color: '#fff' }}>{fpEmail}</strong>
                        <button type="button" onClick={() => setFpStep(1)}
                          style={{
                            background: 'none', border: 'none', color: '#f0d897',
                            fontSize: 11, cursor: 'pointer', fontWeight: 700,
                            marginRight: isRTL ? 6 : 0, marginLeft: !isRTL ? 6 : 0,
                            textDecoration: 'underline', fontFamily: 'inherit'
                          }}>
                          {t('auth.editEmail', 'تعديل')}
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
                            style={{ background: 'none', border: 'none', color: '#f0d897', fontWeight: 700, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', textDecoration: 'underline' }}>
                            {t('auth.resendOtp', 'إعادة إرسال رمز جديد')}
                          </button>
                        : <span>{t('auth.resendIn', 'إعادة الإرسال خلال')} <strong style={{ color: '#fff', fontFamily: 'monospace' }}>{fpCountdown}</strong> {t('auth.seconds', 'ثانية')}</span>}
                    </div>
                    <button type="submit" disabled={loading || fpOtp.join('').length !== 6} style={btn(loading || fpOtp.join('').length !== 6)}>
                      {loading
                        ? <>{spinner}{t('auth.verifying', 'جارٍ التحقق...')}</>
                        : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>verified</span>{t('auth.verifyOtp', 'تأكيد الرمز')}</>}
                    </button>
                  </form>
                )}

                {/* ── Step 3: New Password ── */}
                {fpStep === 3 && (
                  <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>
                        {t('auth.newPassTitle', 'كلمة المرور الجديدة')}
                      </h1>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, margin: 0 }}>
                        {t('auth.newPassSub', 'تم التحقق بنجاح ✅ أنشئ كلمة مرور قوية.')}
                      </p>
                    </div>
                    {/* new pass */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                        {t('auth.newPassLabel', 'كلمة المرور الجديدة *')}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span className="material-symbols-outlined"
                          style={{
                            position: 'absolute',
                            ...(isRTL ? { right: 11 } : { left: 11 }),
                            top: '50%', transform: 'translateY(-50%)',
                            fontSize: 18, color: 'rgba(255,255,255,0.4)'
                          }}>
                          lock
                        </span>
                        <input
                          type={fpShowPass ? 'text' : 'password'}
                          value={fpPass}
                          className="auth-input"
                          onChange={e => { setFpPass(e.target.value); setFpErrs(p => ({ ...p, pass: '' })); }}
                          placeholder={t('auth.passwordPlaceholder', 'كلمة المرور الجديدة')}
                          style={passInput(!!fpErrs.pass)}
                        />
                        {iconBtn(fpShowPass ? 'visibility_off' : 'visibility', () => setFpShowPass(v => !v))}
                      </div>
                      {errRow(fpErrs.pass)}
                      <PasswordStrengthMeter password={fpPass} t={t} />
                    </div>
                    {/* confirm pass */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                        {t('auth.confirmPassLabel', 'تأكيد كلمة المرور *')}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span className="material-symbols-outlined"
                          style={{
                            position: 'absolute',
                            ...(isRTL ? { right: 11 } : { left: 11 }),
                            top: '50%', transform: 'translateY(-50%)',
                            fontSize: 18, color: 'rgba(255,255,255,0.4)'
                          }}>
                          lock_clock
                        </span>
                        <input
                          type={fpShowPass ? 'text' : 'password'}
                          value={fpConfirmPass}
                          className="auth-input"
                          onChange={e => { setFpConfirmPass(e.target.value); setFpErrs(p => ({ ...p, confirm: '' })); }}
                          placeholder={t('auth.confirmPassLabel', 'تأكيد كلمة المرور')}
                          style={{
                            ...passInput(!!fpErrs.confirm),
                            paddingLeft: 38,
                            paddingRight: 38,
                            border: fpConfirmPass && fpPass === fpConfirmPass ? '1.5px solid rgba(74,222,128,0.6)' : passInput(!!fpErrs.confirm).border
                          }}
                        />
                      </div>
                      {fpConfirmPass && (
                        <p style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 3, fontWeight: 700, color: fpPass === fpConfirmPass ? '#4ade80' : '#f87171', margin: 0 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 12 }}>{fpPass === fpConfirmPass ? 'check_circle' : 'cancel'}</span>
                          {fpPass === fpConfirmPass ? t('auth.passMatch', 'كلمتا المرور متطابقتان') : t('auth.passMismatch', 'كلمتا المرور غير متطابقتين')}
                        </p>
                      )}
                      {errRow(fpErrs.confirm)}
                    </div>
                    <button type="submit"
                      disabled={loading || !checkPasswordStrength(fpPass).isStrong || fpPass !== fpConfirmPass}
                      style={{ ...btn(loading || !checkPasswordStrength(fpPass).isStrong || fpPass !== fpConfirmPass), marginTop: 4 }}>
                      {loading
                        ? <>{spinner}{t('auth.savingPass', 'جارٍ الحفظ...')}</>
                        : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>lock_reset</span>{t('auth.saveNewPass', 'حفظ كلمة المرور')}</>}
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
                    {isLogin ? t('auth.loginTitle', 'مرحباً بكم مجدداً') : t('auth.registerTitle', 'إنشاء حساب جديد')}
                  </h1>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: 0 }}>
                    {isLogin ? t('auth.loginSub', 'سعداء بعودتك — لنبنِ مستقبلاً أفضل معاً') : t('auth.registerSub', 'انضم إلى رحلتنا نحو مستقبل عقاري أفضل')}
                  </p>
                </div>

                {/* tabs */}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: 3 }}>
                  {[
                    ['login', t('auth.tabLogin', 'تسجيل الدخول')],
                    ['register', t('auth.tabRegister', 'إنشاء حساب')]
                  ].map(([m, lbl]) => (
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
                    <Field
                      label={t('auth.fullName', 'الاسم الكامل *')}
                      icon="person"
                      value={name}
                      onChange={v => { setName(v); clearErr('name'); }}
                      placeholder={t('auth.fullNamePlaceholder', 'اسمك الكامل')}
                      error={errs.name}
                      isRTL={isRTL}
                    />
                  )}
                  <Field
                    label={t('auth.email', 'البريد الإلكتروني *')}
                    icon="mail"
                    type="email"
                    value={email}
                    onChange={v => { setEmail(v); clearErr('email'); }}
                    placeholder={t('auth.emailPlaceholder', 'example@domain.com')}
                    error={errs.email}
                    isRTL={isRTL}
                  />
                  {!isLogin && (
                    <Field
                      label={t('auth.phone', 'رقم الهاتف *')}
                      icon="call"
                      type="tel"
                      value={phone}
                      maxLength={11}
                      showCounter
                      onChange={handlePhoneChange}
                      placeholder={t('auth.phonePlaceholder', '01XXXXXXXXX')}
                      error={errs.phone}
                      hint={t('auth.phoneHint', '11 رقماً يبدأ بـ 010 / 011 / 012 / 015')}
                      isRTL={isRTL}
                    />
                  )}

                  {/* password field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                        {t('auth.password', 'كلمة المرور *')}
                      </label>
                      {isLogin && (
                        <button type="button" onClick={() => switchMode('forgot')}
                          style={{ background: 'none', border: 'none', fontSize: 11, color: '#f0d897', cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit', textDecoration: 'underline' }}>
                          {t('auth.forgotPassLink', 'نسيت كلمة المرور؟')}
                        </button>
                      )}
                    </div>
                    <div style={{ position: 'relative' }}>
                      <span className="material-symbols-outlined"
                        style={{
                          position: 'absolute',
                          ...(isRTL ? { right: 11 } : { left: 11 }),
                          top: '50%', transform: 'translateY(-50%)',
                          fontSize: 18, color: errs.password ? '#f87171' : 'rgba(255,255,255,0.4)'
                        }}>
                        lock
                      </span>
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        className="auth-input"
                        onChange={e => { setPassword(e.target.value); clearErr('password'); }}
                        placeholder={t('auth.passwordPlaceholder', 'كلمة المرور')}
                        style={passInput(!!errs.password)}
                      />
                      {iconBtn(showPass ? 'visibility_off' : 'visibility', () => setShowPass(v => !v))}
                    </div>
                    {errRow(errs.password)}
                    {!isLogin && <PasswordStrengthMeter password={password} t={t} />}
                  </div>

                  <button type="submit" disabled={loading} style={{ ...btn(loading), marginTop: 4 }}>
                    {loading
                      ? <>{spinner}{isLogin ? t('auth.loggingIn', 'جارٍ تسجيل الدخول...') : t('auth.registering', 'جارٍ إنشاء الحساب...')}</>
                      : isLogin
                        ? <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>{t('auth.submitLogin', 'تسجيل الدخول')}</>
                        : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span>{t('auth.submitRegister', 'إنشاء الحساب')}</>}
                  </button>
                </form>

                {/* switch mode */}
                <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  {isLogin ? t('auth.noAccount', 'ليس لديك حساب؟') : t('auth.haveAccount', 'لديك حساب بالفعل؟')}{' '}
                  <button type="button" onClick={() => switchMode(isLogin ? 'register' : 'login')}
                    style={{ background: 'none', border: 'none', color: '#f0d897', fontWeight: 800, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', textDecoration: 'underline' }}>
                    {isLogin ? t('auth.tabRegister', 'إنشاء حساب جديد') : t('auth.tabLogin', 'تسجيل الدخول')}
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Privacy */}
          <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 14, marginBottom: 4 }}>
            {t('auth.agreeTerms', 'بتسجيلك توافق على')}{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
              {t('auth.terms', 'شروط الاستخدام')}
            </span>
            {' '}{t('auth.and', 'و')}{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
              {t('auth.privacy', 'سياسة الخصوصية')}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
