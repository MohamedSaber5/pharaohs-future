import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import unitService        from '@services/unit.service.js';
import reservationService from '@services/reservation.service.js';
import { useAuth }        from '@context/AuthContext.jsx';
import toast from 'react-hot-toast';

const PH = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80";
const STATUS = { "متاح":"bg-green-100 text-green-800","محجوز":"bg-amber-100 text-amber-800","مباع":"bg-red-100 text-red-800" };

export default function UnitDetailPage() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { user }     = useAuth();
  const [unit,       setUnit]       = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [booking,    setBooking]    = useState(false);
  const [showModal,  setShowModal]  = useState(false);
  const [notes,      setNotes]      = useState('');
  const [error,      setError]      = useState('');
  const [booked,     setBooked]     = useState(null); // reservation after booking

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
      const res = await reservationService.create({ unitId: id, notes });
      const reservation = res?.data ?? res;
      setBooked(reservation);
      setShowModal(false);
      // Refresh unit
      const u = await unitService.getById(id);
      setUnit(u?.data ?? u);
      toast.success('🎉 تم تقديم طلب الحجز بنجاح!');
    } catch (err) {
      const msg = err?.message || 'حدث خطأ';
      if (msg.includes('3')) toast.error('لا يمكنك تقديم أكثر من 3 طلبات حجز نشطة');
      else toast.error(msg);
    } finally { setBooking(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-neutral-50 p-8 animate-pulse flex flex-col gap-6">
      <div className="h-72 bg-neutral-200 rounded-2xl" />
      <div className="h-6 bg-neutral-200 rounded-lg w-1/2" />
    </div>
  );

  if (error || !unit) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <span className="material-symbols-outlined text-[64px] text-neutral-300">error</span>
      <p className="text-[18px] font-bold text-neutral-600">{error || 'الوحدة غير موجودة'}</p>
      <Link to="/properties" className="h-10 px-6 rounded-xl bg-neutral-900 text-white text-[14px] font-bold">العودة</Link>
    </div>
  );

  const img  = unit.images?.[0] || PH;
  const proj = unit.project;
  const isAvailable = unit.status === 'متاح';
  const agent = booked?.agent;

  return (
    <div className="min-h-screen bg-neutral-50" dir="rtl">
      {/* Hero */}
      <div className="relative h-72 md:h-96 bg-[#000e1f] overflow-hidden">
        <img src={img} alt={unit.type} className="w-full h-full object-cover opacity-60" onError={e=>{e.target.src=PH}} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000e1f] to-transparent" />
        <div className="absolute bottom-8 right-0 left-0 max-w-7xl mx-auto px-6 lg:px-12">
          {proj && (
            <div className="flex items-center gap-2 mb-2 text-[13px] text-white/60">
              <Link to={'/projects/'+proj._id} className="hover:text-white">{proj.name}</Link>
              <span>›</span><span className="text-white">{unit.type}</span>
            </div>
          )}
          <h1 className="text-white font-bold text-[28px] md:text-[36px] mb-2">
            {unit.type} — {unit.area} م² | الدور {unit.floor||1}
          </h1>
          <span className={`px-3 py-1.5 rounded-full text-[13px] font-bold ${STATUS[unit.status]||""}`}>{unit.status}</span>
        </div>
      </div>

      {/* Success banner — after booking */}
      {booked && (
        <div className="bg-green-50 border-b border-green-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-700 text-[22px]">check_circle</span>
              </div>
              <div>
                <p className="font-bold text-green-800 text-[15px]">تم تقديم طلب الحجز بنجاح!</p>
                <p className="text-[13px] text-green-600">سيتواصل معك موظف المبيعات المخصص لك خلال 24 ساعة</p>
              </div>
            </div>
            {agent?.whatsapp && (
              <a href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g,'')}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-bold text-white text-[14px] hover:opacity-90 transition-all"
                style={{background:'#25d366'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                تواصل مع موظف المبيعات
              </a>
            )}
            {!agent?.whatsapp && agent?.phone && (
              <a href={`tel:${agent.phone}`}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-bold text-white text-[14px] hover:opacity-90 transition-all bg-[#000e1f]">
                <span className="material-symbols-outlined text-[18px]">call</span>اتصل بموظف المبيعات
              </a>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col lg:flex-row gap-10">
        {/* Details */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
            <h2 className="text-[18px] font-bold text-neutral-900 mb-5">مواصفات الوحدة</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                {icon:"straighten",     label:"المساحة",   value:unit.area+" م²"},
                {icon:"layers",         label:"الدور",     value:"دور "+(unit.floor||1)},
                {icon:"bed",            label:"غرف النوم", value:(unit.rooms||0)+" غرف"},
                {icon:"bathtub",        label:"الحمامات",  value:(unit.bathrooms||0)+" حمام"},
                {icon:"directions_car", label:"مواقف",     value:(unit.parking||0)+" مواقف"},
                {icon:"construction",   label:"التشطيب",   value:unit.finishing||"—"},
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

          {/* Reservation Stages Info */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
            <h2 className="text-[16px] font-bold text-neutral-900 mb-4">مراحل الحجز</h2>
            <div className="flex items-start gap-0 relative">
              {["طلب حجز","قيد المراجعة","محجوز","جاهز للتعاقد","مكتمل"].map((s,i,arr)=>(
                <div key={s} className="flex flex-col items-center flex-1 relative">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white z-10" style={{background:'#000e1f'}}>{i+1}</div>
                  {i < arr.length-1 && <div className="absolute top-4 right-0 w-full h-0.5" style={{background:'#e5e7eb',right:'-50%'}} />}
                  <p className="text-[10px] text-neutral-500 text-center mt-2 leading-tight">{s}</p>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-neutral-400 mt-4">ملاحظة: الحجز يصلح تلقائياً بعد 7 أيام إذا لم يتم التواصل</p>
          </div>

          {unit.description && (
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
              <h2 className="text-[16px] font-bold text-neutral-900 mb-3">وصف الوحدة</h2>
              <p className="text-[15px] text-neutral-600 leading-relaxed">{unit.description}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex flex-col gap-5 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-lg p-6 sticky top-24">
            <p className="text-[13px] text-neutral-500 mb-1">السعر</p>
            <p className="text-[32px] font-bold text-neutral-900 mb-1">
              {Number(unit.price).toLocaleString()}
              <span className="text-[15px] font-normal text-neutral-400 mr-1">ج.م</span>
            </p>
            {unit.ref && <p className="text-[12px] text-neutral-400 mb-5">كود: {unit.ref}</p>}

            {isAvailable && !booked ? (
              <button onClick={()=>setShowModal(true)}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold text-white text-[15px] hover:opacity-90 transition-all shadow-md"
                style={{background:'#000e1f'}}>
                <span className="material-symbols-outlined text-[20px]">bookmark_add</span>احجز الآن
              </button>
            ) : booked ? (
              <div className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold text-green-700 text-[14px] bg-green-50 border border-green-200">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>تم تقديم الطلب
              </div>
            ) : (
              <div className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold text-neutral-500 text-[14px] bg-neutral-100 cursor-not-allowed">
                <span className="material-symbols-outlined text-[20px]">block</span>غير متاحة
              </div>
            )}

            <Link to="/contact" className="mt-3 w-full h-11 flex items-center justify-center gap-2 rounded-xl font-semibold text-neutral-700 text-[14px] hover:bg-neutral-50 transition-all border border-neutral-200">
              <span className="material-symbols-outlined text-[18px]">call</span>تواصل معنا
            </Link>
            <Link to="/reservations" className="mt-2 w-full h-11 flex items-center justify-center gap-2 rounded-xl font-semibold text-[#775a1a] text-[14px] hover:bg-amber-50 transition-all border border-amber-200">
              <span className="material-symbols-outlined text-[18px]">bookmark</span>حجوزاتي
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,14,31,0.7)'}} onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            <h2 className="text-[22px] font-bold text-center text-neutral-900 mb-1">تأكيد طلب الحجز</h2>
            <p className="text-[14px] text-neutral-500 text-center mb-2">
              {unit.type} — {unit.area} م² — الدور {unit.floor||1}
            </p>
            <p className="text-[20px] font-bold text-center text-neutral-900 mb-5">
              {Number(unit.price).toLocaleString()} ج.م
            </p>

            {/* Steps */}
            <div className="bg-neutral-50 rounded-xl p-4 mb-5 flex flex-col gap-2">
              {[
                {n:1, txt:"يتم تقديم طلب الحجز"},
                {n:2, txt:"يتم تعيين موظف مبيعات لك تلقائياً"},
                {n:3, txt:"يتواصل معك الموظف خلال 24 ساعة"},
                {n:4, txt:"يتم إتمام الإجراءات وتوقيع العقد"},
              ].map(s=>(
                <div key={s.n} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{background:'#000e1f'}}>{s.n}</div>
                  <p className="text-[13px] text-neutral-600">{s.txt}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <label className="text-[13px] font-semibold text-neutral-700">ملاحظات (اختياري)</label>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={2}
                placeholder="أي ملاحظات أو استفسارات..."
                className="px-4 py-3 rounded-xl border border-neutral-200 text-[14px] outline-none resize-none bg-neutral-50 focus:border-[#775a1a]" />
            </div>

            <div className="text-[12px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
              <span className="material-symbols-outlined text-[14px] align-middle ml-1">info</span>
              الحجز صالح لمدة 7 أيام — يلغى تلقائياً إن لم يُستكمل
            </div>

            <div className="flex gap-3">
              <button onClick={()=>setShowModal(false)} className="flex-1 h-11 rounded-xl bg-neutral-100 text-neutral-600 text-[14px] font-semibold hover:bg-neutral-200">إلغاء</button>
              <button onClick={handleBook} disabled={booking}
                className="flex-1 h-11 rounded-xl text-white text-[14px] font-bold disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90"
                style={{background:'#000e1f'}}>
                {booking?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />:"تأكيد الحجز"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}