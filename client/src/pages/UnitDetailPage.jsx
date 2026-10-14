import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import unitService        from '@services/unit.service.js';
import reservationService from '@services/reservation.service.js';
import { useAuth }        from '@context/AuthContext.jsx';
import toast from 'react-hot-toast';

const PH = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80";
const STATUS_COLORS = { "متاح":"bg-green-100 text-green-800","محجوز":"bg-amber-100 text-amber-800","مباع":"bg-red-100 text-red-800" };

export default function UnitDetailPage() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { user }    = useAuth();
  const [unit,      setUnit]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [booking,   setBooking]   = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notes,     setNotes]     = useState('');
  const [error,     setError]     = useState('');

  useEffect(() => {
    unitService.getById(id)
      .then(res => setUnit(res?.data ?? res))
      .catch(() => setError('تعذّر تحميل بيانات الوحدة'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async () => {
    if (!user) { toast.error('يجب تسجيل الدخول أولاً'); navigate('/auth'); return; }
    setBooking(true);
    try {
      await reservationService.create({ unitId: id, notes });
      setShowModal(false);
      toast.success('🎉 تم تقديم طلب الحجز بنجاح! سيتواصل معك فريقنا خلال 24 ساعة.');
      // Refresh unit data
      const res = await unitService.getById(id);
      setUnit(res?.data ?? res);
    } catch (err) {
      toast.error(err?.message || 'حدث خطأ أثناء تقديم طلب الحجز');
    } finally { setBooking(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-neutral-50 p-8 animate-pulse flex flex-col gap-6">
      <div className="h-72 bg-neutral-200 rounded-2xl" />
      <div className="h-6 bg-neutral-200 rounded-lg w-1/2" />
      <div className="h-4 bg-neutral-200 rounded-lg w-3/4" />
    </div>
  );

  if (error || !unit) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <span className="material-symbols-outlined text-[64px] text-neutral-300">error</span>
      <p className="text-[18px] font-bold text-neutral-600">{error || 'الوحدة غير موجودة'}</p>
      <Link to="/properties" className="h-10 px-6 rounded-xl bg-neutral-900 text-white text-[14px] font-bold">العودة للوحدات</Link>
    </div>
  );

  const img = unit.images?.[0] || PH;
  const proj = unit.project;
  const isAvailable = unit.status === 'متاح';

  return (
    <div className="min-h-screen bg-neutral-50" dir="rtl">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 bg-[#000e1f] overflow-hidden">
        <img src={img} alt={unit.type} className="w-full h-full object-cover opacity-60" onError={e=>{e.target.src=PH}} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000e1f] to-transparent" />
        <div className="absolute bottom-8 right-0 left-0 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-2 text-[13px] text-white/60">
            {proj && <><Link to={'/projects/'+proj._id} className="hover:text-white transition-colors">{proj.name}</Link><span>›</span></>}
            <span className="text-white">{unit.type}</span>
          </div>
          <h1 className="text-white font-bold text-[28px] md:text-[36px] leading-tight mb-2">
            {unit.type} — {unit.area} م² {unit.floor ? '| الدور ' + unit.floor : ''}
          </h1>
          <span className={`px-3 py-1.5 rounded-full text-[13px] font-bold ${STATUS_COLORS[unit.status]||""}`}>{unit.status}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col lg:flex-row gap-10">
        {/* Details */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Specs Grid */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
            <h2 className="text-[18px] font-bold text-neutral-900 mb-5">مواصفات الوحدة</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {[
                {icon:"straighten",      label:"المساحة",         value:unit.area+" م²"},
                {icon:"layers",          label:"الدور",            value:"الدور " +(unit.floor||1)},
                {icon:"bed",             label:"غرف النوم",        value:(unit.rooms||0)+" غرف"},
                {icon:"bathtub",         label:"الحمامات",         value:unit.bathrooms+" حمام"},
                {icon:"directions_car",  label:"مواقف",            value:(unit.parking||0)+" مواقف"},
                {icon:"construction",    label:"التشطيب",          value:unit.finishing},
              ].map(s=>(
                <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:'rgba(119,90,26,0.1)'}}>
                    <span className="material-symbols-outlined text-[20px]" style={{color:'#775a1a'}}>{s.icon}</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400">{s.label}</p>
                    <p className="text-[14px] font-bold text-neutral-800">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {unit.description && (
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
              <h2 className="text-[18px] font-bold text-neutral-900 mb-3">وصف الوحدة</h2>
              <p className="text-[15px] text-neutral-600 leading-relaxed">{unit.description}</p>
            </div>
          )}

          {/* Project Info */}
          {proj && (
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
              <h2 className="text-[18px] font-bold text-neutral-900 mb-4">عن المشروع</h2>
              <div className="flex items-center gap-4">
                {proj.images?.[0] && <img src={proj.images[0]} className="w-20 h-16 rounded-xl object-cover" onError={e=>e.target.style.display='none'} />}
                <div className="flex-1">
                  <p className="text-[16px] font-bold text-neutral-900">{proj.name}</p>
                  <p className="text-[13px] text-neutral-500 flex items-center gap-1 mt-0.5"><span className="material-symbols-outlined text-[15px]" style={{color:'#775a1a'}}>location_on</span>{proj.location}</p>
                </div>
                <Link to={'/projects/'+proj._id} className="h-9 px-4 rounded-xl bg-neutral-100 text-neutral-700 text-[13px] font-semibold hover:bg-neutral-200 transition-all flex items-center gap-1.5">
                  عرض<span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex flex-col gap-5 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-lg p-6 sticky top-24">
            <p className="text-[13px] text-neutral-500 mb-1">السعر</p>
            <p className="text-[32px] font-bold text-neutral-900 mb-0.5">
              {Number(unit.price).toLocaleString()}
              <span className="text-[16px] font-normal text-neutral-400 mr-1">ج.م</span>
            </p>
            {unit.ref && <p className="text-[12px] text-neutral-400 mb-5">كود الوحدة: {unit.ref}</p>}

            {isAvailable ? (
              <button onClick={()=>setShowModal(true)}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold text-white text-[15px] hover:opacity-90 transition-all shadow-md"
                style={{background:'#000e1f'}}>
                <span className="material-symbols-outlined text-[20px]">bookmark_add</span>احجز الآن
              </button>
            ) : (
              <div className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold text-neutral-500 text-[15px] bg-neutral-100 cursor-not-allowed">
                <span className="material-symbols-outlined text-[20px]">block</span>
                {unit.status === 'محجوز' ? 'محجوزة' : 'مباعة'}
              </div>
            )}
            <Link to="/contact" className="mt-3 w-full h-11 flex items-center justify-center gap-2 rounded-xl font-semibold text-neutral-700 text-[14px] hover:bg-neutral-100 transition-all border border-neutral-200">
              <span className="material-symbols-outlined text-[18px]">call</span>تواصل معنا
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,14,31,0.7)'}} onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{background:'rgba(0,14,31,0.08)'}}>
              <span className="material-symbols-outlined text-[28px]" style={{color:'#000e1f'}}>bookmark_add</span>
            </div>
            <h2 className="text-[22px] font-bold text-center text-neutral-900 mb-1">تأكيد الحجز</h2>
            <p className="text-[14px] text-neutral-500 text-center mb-6">
              {unit.type} — {unit.area} م² — الدور {unit.floor||1}<br/>
              <span className="font-bold text-neutral-800">{Number(unit.price).toLocaleString()} ج.م</span>
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-[13px] font-semibold text-neutral-700">ملاحظات (اختياري)</label>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="أي ملاحظات أو استفسارات خاصة..."
                className="px-4 py-3 rounded-xl border border-neutral-200 text-[14px] outline-none resize-none bg-neutral-50 focus:border-[#775a1a] transition-all" />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-[13px] text-amber-800">
              <span className="material-symbols-outlined text-[16px] align-middle ml-1">info</span>
              بتقديم طلب الحجز ستتحول الوحدة لحالة "محجوز" وسيتواصل معك فريقنا خلال 24 ساعة.
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setShowModal(false)} className="flex-1 h-11 rounded-xl bg-neutral-100 text-neutral-600 font-semibold text-[14px] hover:bg-neutral-200 transition-all">إلغاء</button>
              <button onClick={handleBook} disabled={booking}
                className="flex-1 h-11 rounded-xl font-bold text-white text-[14px] disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                style={{background:'#000e1f'}}>
                {booking?<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />جاري...</>:<><span className="material-symbols-outlined text-[18px]">check</span>تأكيد الحجز</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}