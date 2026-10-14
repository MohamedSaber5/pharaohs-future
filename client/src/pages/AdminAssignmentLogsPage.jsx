import { useState, useEffect } from 'react';
import reservationService from '@services/reservation.service.js';

export default function AdminAssignmentLogsPage() {
  const [logs,    setLogs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,    setPage]    = useState(1);
  const [total,   setTotal]   = useState(0);

  useEffect(() => {
    setLoading(true);
    reservationService.getAssignmentLogs({ page, limit:30 })
      .then(res => {
        const d = res?.data ?? res;
        setLogs(d?.logs ?? []);
        setTotal(d?.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6" style={{background:'#f8f9fa',minHeight:'100vh'}}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900">سجل التعيينات</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">عرض كل تعيينات المستخدمين على موظفي المبيعات</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-white border border-neutral-100 shadow-sm text-[13px] font-bold text-neutral-700">
          إجمالي: <span style={{color:'#775a1a'}}>{total}</span> سجل
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex flex-col gap-3">{[1,2,3,4,5].map(i=><div key={i} className="h-12 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <span className="material-symbols-outlined text-[56px] text-neutral-300 mb-4">assignment_ind</span>
            <h3 className="text-[18px] font-bold text-neutral-600">لا توجد سجلات بعد</h3>
            <p className="text-[14px] text-neutral-400 mt-2">ستظهر هنا التعيينات عند بدء الحجوزات</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{background:'#f8f9fa',borderBottom:'1px solid #f1f3f4'}}>
                <tr>{["#","المستخدم","التليفون","موظف المبيعات","واتساب الموظف","نوع التعيين","التاريخ"].map(h=>(
                  <th key={h} className="px-4 py-3.5 text-right text-[12px] font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {logs.map((log,i)=>(
                  <tr key={log._id} className="border-t border-neutral-100 hover:bg-neutral-50/60">
                    <td className="px-4 py-3 text-[12px] text-neutral-400 font-mono">{(page-1)*30+i+1}</td>
                    <td className="px-4 py-3">
                      <p className="text-[14px] font-bold text-neutral-800">{log.user?.name||'—'}</p>
                      <p className="text-[11px] text-neutral-400">{log.user?.email}</p>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600">{log.user?.phone||'—'}</td>
                    <td className="px-4 py-3">
                      <p className="text-[14px] font-bold text-neutral-800">{log.agent?.name||'—'}</p>
                      <p className="text-[11px] text-neutral-400">{log.agent?.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      {log.agent?.whatsapp ? (
                        <a href={`https://wa.me/${log.agent.whatsapp.replace(/[^0-9]/g,'')}`} target="_blank"
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-green-700 hover:underline">
                          <span className="material-symbols-outlined text-[16px]">call</span>{log.agent.whatsapp}
                        </a>
                      ) : <span className="text-[12px] text-neutral-400">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        log.note?.includes('يدوي') ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>{log.note?.includes('يدوي') ? 'يدوي' : 'تلقائي'}</span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-neutral-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleDateString('ar-EG',{year:'numeric',month:'short',day:'numeric'})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {total > 30 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
            <p className="text-[13px] text-neutral-500">صفحة {page} من {Math.ceil(total/30)}</p>
            <div className="flex gap-2">
              <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="h-9 px-4 rounded-lg bg-neutral-100 text-[13px] font-semibold disabled:opacity-40">السابق</button>
              <button disabled={page>=Math.ceil(total/30)} onClick={()=>setPage(p=>p+1)} className="h-9 px-4 rounded-lg bg-neutral-100 text-[13px] font-semibold disabled:opacity-40">التالي</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}