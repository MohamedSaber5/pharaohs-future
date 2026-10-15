import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';
import unitService from '@services/unit.service.js';
import reservationService from '@services/reservation.service.js';
import toast from 'react-hot-toast';

const STAGE_ICONS = {
  "طلب حجز":        "pending",
  "قيد المراجعة":   "rate_review",
  "محجوز":           "bookmark_added",
  "جاهز للتعاقد":  "handshake",
  "مكتمل":          "verified",
  "ملغي":            "cancel",
  "منتهي الصلاحية": "hourglass_disabled",
};

export default function UnitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [unit,        setUnit]        = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [activeImg,   setActiveImg]   = useState(0);
  const [showBook,    setShowBook]    = useState(false);
  const [booking,     setBooking]     = useState(false);
  const [booked,      setBooked]      = useState(null); // reservation result
  const [notes,       setNotes]       = useState('');
  const [myRes,       setMyRes]       = useState(null);  // existing reservation if any

  useEffect(() => {
    (async () => {
      try {
        const res = await unitService.getById(id);
        const u = res?.data ?? res;
        setUnit(u);
        // Check if user already has a reservation on this unit
        if (isAuthenticated) {
          try {
            const myResRes = await reservationService.getMyReservations();
            const reservations = myResRes?.data?.reservations ?? myResRes?.data ?? [];
            const existing = reservations.find(r =>
              (r.unit?._id || r.unit) === id &&
              !["ملغي","منتهي الصلاحية"].includes(r.status)
            );
            if (existing) setMyRes(existing);
          } catch {}
        }
      } catch { toast.error('تعذّر تحميل الوحدة'); }
      finally { setLoading(false); }
    })();
  }, [id, isAuthenticated]);

  const handleBook = async () => {
    if (!isAuthenticated) { navigate('/auth'); return; }
    setBooking(true);
    try {
      const res = await reservationService.create({ unitId: id, notes });
      const r = res?.data ?? res;
      setBooked(r);
      setMyRes(r);
      setUnit(prev => prev ? { ...prev, status: 'محجوز' } : prev);
      toast.success('تم الحجز بنجاح! ✅');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'حدث خطأ';
      toast.error(msg);
    } finally { setBooking(false); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{background:'#f8f9fa'}}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-[#775a1a] rounded-full animate-spin"/>
        <p className="text-neutral-500">جارٍ تحميل الوحدة...</p>
      </div>
    </div>
  );

  if (!unit) return (
    <div className="min-h-screen flex items-center justify-center" style={{background:'#f8f9fa'}}>
      <div className="text-center">
        <span className="material-symbols-outlined text-[64px] text-neutral-300">home_work</span>
        <h2 className="text-[20px] font-bold text-neutral-600 mt-4">الوحدة غير موجودة</h2>
        <Link to="/properties" className="mt-4 inline-block text-[#775a1a] font-semibold hover:underline">العودة للوحدات</Link>
      </div>
    </div>
  );

  const isAvailable = unit.status === 'متاح';
  const imgs = (unit.images && unit.images.length > 0) ? unit.images : [];
  const imgUrl = (src) => src?.startsWith('http') ? src : `http://localhost:5000${src}`;

  // Payment calculations
  const downAmt    = Math.round(unit.price * (unit.downPaymentPercent || 0) / 100);
  const remaining  = unit.price - downAmt;
  const monthlyAmt = unit.installmentYears > 0 ? Math.round(remaining / (unit.installmentYears * 12)) : 0;

  const whatsappAgent = myRes?.agentWhatsapp || myRes?.agent?.whatsapp;

  return (
    <div className="min-h-screen" style={{background:'#f8f9fa'}} dir="rtl">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 text-[13px] text-neutral-500">
          <Link to="/" className="hover:text-neutral-800 transition-colors">الرئيسية</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_left</span>
          <Link to="/properties" className="hover:text-neutral-800 transition-colors">الوحدات</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_left</span>
          <span className="text-neutral-800 font-semibold">{unit.type} — {unit.project?.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── LEFT: Images + Details ─────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Image Gallery */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100">
            {imgs.length > 0 ? (
              <>
                <div className="relative h-80 sm:h-[420px] overflow-hidden">
                  <img src={imgUrl(imgs[activeImg])} alt={unit.type}
                    className="w-full h-full object-cover transition-all duration-500"/>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${isAvailable?'bg-green-500':'bg-red-500'} text-white`}>
                      {unit.status}
                    </span>
                  </div>
                </div>
                {imgs.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto">
                    {imgs.map((img,i)=>(
                      <button key={i} onClick={()=>setActiveImg(i)}
                        className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg===i?'border-[#775a1a]':'border-transparent'}`}>
                        <img src={imgUrl(img)} className="w-full h-full object-cover"/>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="h-80 flex items-center justify-center bg-neutral-100">
                <span className="material-symbols-outlined text-[80px] text-neutral-300">image_not_supported</span>
              </div>
            )}
          </div>

          {/* Key Specs */}
          <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6">
            <h2 className="text-[18px] font-bold text-neutral-900 mb-5">تفاصيل الوحدة</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                {icon:'straighten',   label:'المساحة',      val: unit.area + ' م²'},
                {icon:'layers',       label:'الدور',         val: 'الدور ' + unit.floor},
                {icon:'apartment',    label:'المبنى',        val: unit.building || '—'},
                {icon:'king_bed',     label:'غرف النوم',     val: unit.rooms + ' غرف'},
                {icon:'bathroom',     label:'الحمامات',      val: unit.bathrooms + ' حمام'},
                {icon:'local_parking',label:'مواقف',         val: unit.parking + ' موقف'},
                {icon:'palette',      label:'التشطيب',       val: unit.finishing},
                {icon:'home_work',    label:'النوع',         val: unit.type},
                {icon:'location_on',  label:'المشروع',       val: unit.project?.name||'—'},
              ].map(s=>(
                <div key={s.label} className="flex items-center gap-3 p-3 rounded-2xl" style={{background:'#f8f9fa'}}>
                  <span className="material-symbols-outlined text-[22px]" style={{color:'#775a1a'}}>{s.icon}</span>
                  <div>
                    <p className="text-[11px] text-neutral-400">{s.label}</p>
                    <p className="text-[14px] font-semibold text-neutral-800">{s.val}</p>
                  </div>
                </div>
              ))}
            </div>
            {unit.description && (
              <div className="mt-5 pt-5 border-t border-neutral-100">
                <h3 className="text-[15px] font-bold text-neutral-800 mb-2">الوصف</h3>
                <p className="text-[14px] text-neutral-600 leading-relaxed">{unit.description}</p>
              </div>
            )}
          </div>

          {/* Features */}
          {unit.features && unit.features.length > 0 && (
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6">
              <h2 className="text-[18px] font-bold text-neutral-900 mb-4">المميزات</h2>
              <div className="flex flex-wrap gap-2">
                {unit.features.map(f=>(
                  <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold"
                    style={{background:'#f0f7ff',color:'#1d4ed8'}}>
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>{f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reservation Status (if already reserved) */}
          {myRes && (
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6">
              <h2 className="text-[18px] font-bold text-neutral-900 mb-4">حالة الحجز</h2>
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-[28px] text-[#775a1a]">{STAGE_ICONS[myRes.status]||'info'}</span>
                <div>
                  <p className="text-[16px] font-bold text-neutral-900">{myRes.status}</p>
                  <p className="text-[12px] text-neutral-500">تاريخ الحجز: {new Date(myRes.createdAt).toLocaleDateString('ar-EG')}</p>
                </div>
              </div>
              {myRes.agentNotes && (
                <div className="p-3 rounded-xl" style={{background:'#fffbeb',border:'1px solid #fde68a'}}>
                  <p className="text-[13px] text-amber-800"><span className="font-bold">ملاحظة الموظف:</span> {myRes.agentNotes}</p>
                </div>
              )}
              {whatsappAgent && (
                <a href={`https://wa.me/${whatsappAgent.replace(/[^0-9]/g,'')}`} target="_blank" rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full h-11 rounded-2xl font-bold text-white text-[14px] hover:opacity-90 transition-all"
                  style={{background:'#25d366'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.918-1.42A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.065-1.117l-.291-.173-3.022.874.845-3.117-.19-.303A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
                  تواصل مع موظف المبيعات
                </a>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT: Pricing + Book ──────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Price Card */}
          <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6 sticky top-4">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[28px] font-bold text-neutral-900">{Number(unit.price).toLocaleString()}</span>
              <span className="text-[14px] text-neutral-500">ج.م</span>
            </div>
            {unit.ref && <p className="text-[11px] text-neutral-400 mb-4">كود الوحدة: {unit.ref}</p>}

            {/* Payment Terms */}
            <div className="rounded-2xl p-4 mb-5 flex flex-col gap-3" style={{background:'#f0f7ff'}}>
              <h3 className="text-[13px] font-bold text-neutral-700 mb-1">شروط الدفع</h3>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-500">الدفعة المقدمة ({unit.downPaymentPercent || 0}%)</span>
                <span className="text-[14px] font-bold text-neutral-900">{downAmt.toLocaleString()} ج.م</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-500">التقسيط الشهري</span>
                <span className="text-[14px] font-bold text-neutral-900">
                  {monthlyAmt > 0 ? monthlyAmt.toLocaleString() + ' ج.م' : 'كاش'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-500">مدة التقسيط</span>
                <span className="text-[14px] font-bold text-neutral-900">{unit.installmentYears || 0} سنة</span>
              </div>
              {unit.deliveryDate && (
                <div className="flex items-center justify-between pt-2 border-t border-blue-100">
                  <span className="text-[13px] text-neutral-500">تاريخ التسليم</span>
                  <span className="text-[13px] font-bold text-neutral-900">{new Date(unit.deliveryDate).toLocaleDateString('ar-EG',{year:'numeric',month:'long'})}</span>
                </div>
              )}
            </div>

            {/* Book Button */}
            {myRes ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 p-3 rounded-xl" style={{background:'#f0fdf4',border:'1px solid #bbf7d0'}}>
                  <span className="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
                  <p className="text-[13px] font-semibold text-green-800">لديك حجز نشط على هذه الوحدة</p>
                </div>
              </div>
            ) : isAvailable ? (
              <button onClick={()=>setShowBook(true)}
                className="w-full h-12 rounded-2xl font-bold text-white text-[15px] hover:opacity-90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
                style={{background:'#000e1f'}}>
                <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
                احجز الآن
              </button>
            ) : (
              <button disabled className="w-full h-12 rounded-2xl font-bold text-white text-[15px] opacity-50 flex items-center justify-center gap-2" style={{background:'#6b7280'}}>
                <span className="material-symbols-outlined text-[20px]">do_not_disturb</span>
                غير متاح للحجز
              </button>
            )}

            {/* Company policy */}
            <div className="mt-4 p-3 rounded-xl" style={{background:'#fffbeb',border:'1px solid #fde68a'}}>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-600 text-[16px] mt-0.5">info</span>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  يُسمح بحجز 3 وحدات كحد أقصى لكل عميل في وقت واحد.
                  سيتم إلغاء الحجز تلقائياً إذا لم يُتخذ إجراء خلال 7 أيام.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Booking Modal ──────────────────────────────────────── */}
      {showBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,14,31,0.7)'}} onClick={e=>e.target===e.currentTarget&&!booking&&setShowBook(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7">
            {booked ? (
              // Success screen
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px] text-green-600">check_circle</span>
                </div>
                <h3 className="text-[22px] font-bold text-neutral-900">تم الحجز بنجاح! 🎉</h3>
                <p className="text-[14px] text-neutral-500">
                  تم تسجيل طلب الحجز. سيتواصل معك موظف المبيعات المعيّن قريباً.
                </p>
                <div className="w-full p-4 rounded-2xl text-right" style={{background:'#f0f7ff'}}>
                  <p className="text-[12px] text-neutral-500 mb-1">مرحلة الحجز الحالية</p>
                  <p className="text-[16px] font-bold text-neutral-900">{booked.status}</p>
                </div>
                {(booked.agentWhatsapp || booked.agent?.whatsapp) && (
                  <a href={`https://wa.me/${(booked.agentWhatsapp||booked.agent?.whatsapp).replace(/[^0-9]/g,'')}`}
                    target="_blank" rel="noreferrer"
                    className="w-full h-11 rounded-2xl font-bold text-white flex items-center justify-center gap-2 text-[14px] hover:opacity-90 transition-all"
                    style={{background:'#25d366'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.918-1.42A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.065-1.117l-.291-.173-3.022.874.845-3.117-.19-.303A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
                    تواصل مع موظف المبيعات
                  </a>
                )}
                <button onClick={()=>{setShowBook(false); setBooked(null);}}
                  className="w-full h-10 rounded-xl bg-neutral-100 text-neutral-600 font-semibold hover:bg-neutral-200 transition-all">
                  إغلاق
                </button>
              </div>
            ) : (
              // Confirmation screen
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[20px] font-bold text-neutral-900">تأكيد الحجز</h3>
                  <button onClick={()=>setShowBook(false)} className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-all">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                {/* Unit Summary */}
                <div className="p-4 rounded-2xl mb-5" style={{background:'#f8f9fa'}}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] text-neutral-500">الوحدة</span>
                    <span className="text-[14px] font-bold text-neutral-900">{unit.type} — {unit.area} م²</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] text-neutral-500">المشروع</span>
                    <span className="text-[14px] font-semibold text-neutral-700">{unit.project?.name}</span>
                  </div>
                  {unit.building && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] text-neutral-500">المبنى / الدور</span>
                      <span className="text-[14px] font-semibold text-neutral-700">{unit.building} — الدور {unit.floor}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                    <span className="text-[13px] text-neutral-500">السعر</span>
                    <span className="text-[16px] font-bold text-neutral-900">{Number(unit.price).toLocaleString()} ج.م</span>
                  </div>
                </div>

                {/* Payment Terms Summary */}
                <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                  <div className="p-3 rounded-2xl" style={{background:'#f0f7ff'}}>
                    <p className="text-[18px] font-bold text-neutral-900">{downAmt.toLocaleString()}</p>
                    <p className="text-[10px] text-neutral-500">دفعة مقدمة ج.م</p>
                  </div>
                  <div className="p-3 rounded-2xl" style={{background:'#f0f7ff'}}>
                    <p className="text-[18px] font-bold text-neutral-900">{monthlyAmt > 0 ? monthlyAmt.toLocaleString() : 'كاش'}</p>
                    <p className="text-[10px] text-neutral-500">قسط/شهر ج.م</p>
                  </div>
                  <div className="p-3 rounded-2xl" style={{background:'#f0f7ff'}}>
                    <p className="text-[18px] font-bold text-neutral-900">{unit.installmentYears || 0}</p>
                    <p className="text-[10px] text-neutral-500">سنوات تقسيط</p>
                  </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5 mb-5">
                  <label className="text-[13px] font-semibold text-neutral-700">ملاحظات (اختياري)</label>
                  <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}
                    placeholder="أي تفاصيل أو استفسارات تريد إيصالها لموظف المبيعات..."
                    className="px-3 py-2.5 rounded-xl border border-neutral-200 text-[13px] outline-none bg-neutral-50 resize-none focus:border-[#775a1a] transition-all"/>
                </div>

                {/* Policy reminder */}
                <div className="p-3 rounded-xl mb-5" style={{background:'#fffbeb',border:'1px solid #fde68a'}}>
                  <p className="text-[11px] text-amber-800">
                    <span className="font-bold">تنبيه:</span> بالضغط على "تأكيد الحجز" سيتم حجز هذه الوحدة فوراً وإسناد موظف مبيعات لمتابعتك. يُمكن حجز 3 وحدات كحد أقصى.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button onClick={()=>setShowBook(false)} className="flex-1 h-11 rounded-xl bg-neutral-100 text-neutral-600 font-semibold hover:bg-neutral-200 transition-all">إلغاء</button>
                  <button onClick={handleBook} disabled={booking}
                    className="flex-1 h-11 rounded-xl text-white font-bold disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
                    style={{background:'#000e1f'}}>
                    {booking ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <><span className="material-symbols-outlined text-[18px]">bookmark_add</span>تأكيد الحجز</>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}