import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import reservationService from '@services/reservation.service.js';

const STATUS = {
  "معلّق":  { cls:"bg-amber-100 text-amber-800",  icon:"schedule"       },
  "مؤكد":  { cls:"bg-blue-100 text-blue-800",    icon:"check_circle"   },
  "مكتمل": { cls:"bg-green-100 text-green-800",  icon:"task_alt"       },
  "ملغي":   { cls:"bg-red-100 text-red-800",      icon:"cancel"         },
};

export default function MyReservationsPage() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    reservationService.getMy()
      .then(res => setItems(res?.data ?? res ?? []))
      .catch(() => setError('تعذّر تحميل الحجوزات'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50" dir="rtl">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-32 pb-16">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-neutral-900 mb-1">حجوزاتي</h1>
          <p className="text-[14px] text-neutral-500">{items.length} حجز مسجّل</p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-700 text-[14px] mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>{error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-white rounded-2xl border border-neutral-100 animate-pulse" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-neutral-100 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[40px] text-neutral-400">bookmark</span>
            </div>
            <h3 className="text-[20px] font-bold text-neutral-700 mb-2">لا توجد حجوزات بعد</h3>
            <p className="text-[14px] text-neutral-400 mb-6">تصفّح وحداتنا المتاحة وابدأ حجزك الأول</p>
            <Link to="/properties" className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-bold text-white text-[14px] hover:opacity-90 transition-all shadow-md" style={{background:'#000e1f'}}>
              <span className="material-symbols-outlined text-[18px]">search</span>استعرض الوحدات
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map(r => {
              const s = STATUS[r.status] || STATUS["معلّق"];
              const u = r.unit;
              const p = r.project;
              return (
                <div key={r._id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-1.5 ${s.cls}`}>
                        <span className="material-symbols-outlined text-[16px]">{s.icon}</span>{r.status}
                      </span>
                      <span className="text-[12px] text-neutral-400">
                        {new Date(r.createdAt).toLocaleDateString('ar-EG',{year:'numeric',month:'long',day:'numeric'})}
                      </span>
                    </div>
                    <span className="text-[12px] font-mono text-neutral-400">#...{r._id.slice(-6)}</span>
                  </div>
                  <div className="p-5 flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(119,90,26,0.1)'}}>
                      <span className="material-symbols-outlined text-[24px]" style={{color:'#775a1a'}}>holiday_village</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[15px] font-bold text-neutral-900">
                        {u?.type} — {u?.area} م²
                      </p>
                      <p className="text-[13px] text-neutral-500 mt-0.5">
                        الدور {u?.floor||1} | {u?.rooms||'—'} غرف | {u?.finishing}
                      </p>
                      {p && (
                        <p className="text-[13px] text-neutral-500 mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]" style={{color:'#775a1a'}}>apartment</span>
                          {p.name} — {p.location}
                        </p>
                      )}
                      {r.notes && (
                        <p className="text-[12px] text-neutral-400 mt-2 bg-neutral-50 rounded-lg px-3 py-1.5">ملاحظتك: {r.notes}</p>
                      )}
                    </div>
                    <div className="text-left flex-shrink-0">
                      <p className="text-[18px] font-bold text-neutral-900">{u?.price ? Number(u.price).toLocaleString() : '—'}</p>
                      <p className="text-[12px] text-neutral-400">ج.م</p>
                    </div>
                  </div>
                  {r.adminNotes && (
                    <div className="px-5 pb-4">
                      <p className="text-[13px] bg-blue-50 text-blue-700 rounded-xl px-4 py-2.5">
                        <span className="font-bold">ملاحظة من الفريق: </span>{r.adminNotes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}