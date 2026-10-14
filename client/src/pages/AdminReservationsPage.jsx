import { useState, useEffect, useCallback } from 'react';
import reservationService from '@services/reservation.service.js';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const STATUS_LIST  = ["معلّق","مؤكد","مكتمل","ملغي"];
const STATUS_COLORS = {
  "معلّق": "bg-amber-100 text-amber-800",
  "مؤكد": "bg-blue-100 text-blue-800",
  "مكتمل":"bg-green-100 text-green-800",
  "ملغي":  "bg-red-100 text-red-800",
};

function StatCard({label, value, icon, color, bg, loading}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}>
          <span className={`material-symbols-outlined text-[22px] ${color}`}>{icon}</span>
        </div>
      </div>
      {loading
        ? <div className="h-8 w-16 bg-neutral-100 animate-pulse rounded-lg mb-1" />
        : <p className={`text-[30px] font-bold leading-none mb-1 ${color}`}>{value ?? "—"}</p>
      }
      <p className="text-[13px] text-neutral-500">{label}</p>
    </div>
  );
}

export default function AdminReservationsPage() {
  const [stats,    setStats]    = useState(null);
  const [items,    setItems]    = useState([]);
  const [total,    setTotal]    = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [sLoading, setSLoading] = useState(true);
  const [filter,   setFilter]   = useState('الكل');
  const [page,     setPage]     = useState(1);
  const [updating, setUpdating] = useState(null);
  const [editId,   setEditId]   = useState(null);
  const [newStatus,setNewStatus]= useState('');
  const [adminNote,setAdminNote]= useState('');

  const loadStats = useCallback(async () => {
    setSLoading(true);
    try {
      const res = await reservationService.getStats();
      setStats(res?.data ?? res);
    } catch {}
    finally { setSLoading(false); }
  }, []);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit:15 };
      if (filter !== 'الكل') params.status = filter;
      const res = await reservationService.getAll(params);
      const d = res?.data ?? res;
      setItems(d?.reservations ?? []);
      setTotal(d?.total ?? 0);
    } catch {}
    finally { setLoading(false); }
  }, [filter, page]);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => { loadItems(); }, [loadItems]);

  const openEdit = (r) => { setEditId(r._id); setNewStatus(r.status); setAdminNote(r.adminNotes||''); };
  const handleUpdate = async () => {
    setUpdating(editId);
    try {
      await reservationService.updateStatus(editId, { status:newStatus, adminNotes:adminNote });
      toast.success('تم تحديث الحجز ✅');
      setEditId(null); loadStats(); loadItems();
    } catch (err) { toast.error(err?.message || 'حدث خطأ'); }
    finally { setUpdating(null); }
  };

  /* ══ PDF Export ══ */
  const exportPDF = () => {
    const doc = new jsPDF({ orientation:'landscape', unit:'mm', format:'a4' });

    // Header
    doc.setFillColor(0, 14, 31);
    doc.rect(0, 0, 297, 30, 'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(16);
    doc.setFont('helvetica','bold');
    doc.text('Pharaohs Future - Reservations Report', 148, 12, { align:'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica','normal');
    doc.text('Generated: ' + new Date().toLocaleString('en-GB'), 148, 20, { align:'center' });

    // Summary
    if (stats) {
      const s = stats.summary;
      doc.setTextColor(0,0,0);
      doc.setFontSize(11);
      doc.setFont('helvetica','bold');
      doc.text('Summary:', 14, 40);
      doc.setFont('helvetica','normal');
      doc.setFontSize(9);
      doc.text([
        'Total: '     + (s.total||0),
        'Pending: '   + (s.pending||0),
        'Confirmed: ' + (s.confirmed||0),
        'Completed: ' + (s.completed||0),
        'Cancelled: ' + (s.cancelled||0),
      ].join('   |   '), 14, 48);
    }

    // Table
    autoTable(doc, {
      startY: 55,
      head: [['#','Client','Phone','Email','Project','Unit','Area','Floor','Price','Status','Date']],
      body: items.map((r,i) => [
        i+1,
        r.user?.name   || '-',
        r.user?.phone  || '-',
        r.user?.email  || '-',
        r.project?.name     || '-',
        r.unit?.type        || '-',
        (r.unit?.area||'-') + ' m2',
        r.unit?.floor       || '-',
        r.unit?.price ? Number(r.unit.price).toLocaleString() + ' EGP' : '-',
        r.status,
        new Date(r.createdAt).toLocaleDateString('en-GB'),
      ]),
      headStyles:   { fillColor:[0,14,31], textColor:255, fontStyle:'bold', fontSize:8 },
      bodyStyles:   { fontSize:7, cellPadding:2 },
      alternateRowStyles: { fillColor:[248,249,250] },
      styles: { overflow:'linebreak', cellWidth:'wrap' },
      columnStyles: {
        0:  { cellWidth:8  },
        1:  { cellWidth:28 },
        2:  { cellWidth:22 },
        3:  { cellWidth:40 },
        4:  { cellWidth:32 },
        5:  { cellWidth:18 },
        6:  { cellWidth:16 },
        7:  { cellWidth:12 },
        8:  { cellWidth:26 },
        9:  { cellWidth:18 },
        10: { cellWidth:20 },
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 9) {
          const st = data.cell.raw;
          if (st === 'مؤكد')   data.cell.styles.fillColor = [219,234,254];
          if (st === 'مكتمل') data.cell.styles.fillColor = [220,252,231];
          if (st === 'ملغي')   data.cell.styles.fillColor = [254,226,226];
          if (st === 'معلّق')  data.cell.styles.fillColor = [254,243,199];
        }
      },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8); doc.setTextColor(150);
      doc.text('Page ' + i + ' of ' + pageCount, 148, doc.internal.pageSize.height - 5, { align:'center' });
      doc.text('Pharaohs Future Real Estate', 14, doc.internal.pageSize.height - 5);
    }

    doc.save('reservations-' + new Date().toISOString().split('T')[0] + '.pdf');
    toast.success('تم تحميل التقرير PDF ✅');
  };

  const s = stats?.summary ?? {};

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-7" style={{ background:"#f8f9fa", minHeight:"100vh" }}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900">إدارة الحجوزات</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">{total} حجز إجمالي</p>
        </div>
        <button onClick={exportPDF}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-[13px] font-bold hover:opacity-90 transition-all shadow-md"
          style={{ background:"#775a1a", color:"white" }}>
          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>تحميل تقرير PDF
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard label="إجمالي الحجوزات" value={s.total}     icon="bookmark"      color="text-[#000e1f]"  bg="bg-[#000e1f]/8"    loading={sLoading} />
        <StatCard label="معلّق"           value={s.pending}   icon="schedule"      color="text-amber-700"  bg="bg-amber-50"       loading={sLoading} />
        <StatCard label="مؤكد"           value={s.confirmed}  icon="check_circle"  color="text-blue-700"   bg="bg-blue-50"        loading={sLoading} />
        <StatCard label="مكتمل"          value={s.completed}  icon="task_alt"      color="text-green-700"  bg="bg-green-50"       loading={sLoading} />
        <StatCard label="ملغي"           value={s.cancelled}  icon="cancel"        color="text-red-700"    bg="bg-red-50"         loading={sLoading} />
      </div>

      {/* Top Projects */}
      {stats?.byProject?.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
          <h2 className="text-[16px] font-bold text-neutral-900 mb-4">أعلى المشروعات حجوزاً</h2>
          <div className="flex flex-col gap-3">
            {stats.byProject.map((p,i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{background:'#000e1f'}}>{i+1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[14px] font-semibold text-neutral-800">{p.name}</span>
                    <span className="text-[13px] font-bold" style={{color:'#775a1a'}}>{p.count} حجز</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:Math.min((p.count/(s.total||1))*100,100)+'%',background:'#775a1a'}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 flex items-center gap-2 flex-wrap">
        {["الكل","معلّق","مؤكد","مكتمل","ملغي"].map(s=>(
          <button key={s} onClick={()=>{ setFilter(s); setPage(1); }}
            className={`h-9 px-4 rounded-lg text-[13px] font-semibold transition-all ${filter===s?"text-white":"text-neutral-500 bg-neutral-100 hover:bg-neutral-200"}`}
            style={filter===s?{background:'#000e1f'}:{}}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex flex-col gap-3">{[1,2,3,4].map(i=><div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-[56px] text-neutral-300 mb-4">bookmark</span>
            <h3 className="text-[18px] font-bold text-neutral-600 mb-1">لا توجد حجوزات</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{background:'#f8f9fa',borderBottom:'1px solid #f1f3f4'}}>
                  {["#","العميل","التليفون","المشروع","الوحدة","المساحة","السعر","الحالة","التاريخ","إجراءات"].map(h=>(
                    <th key={h} className="px-4 py-3.5 text-right text-[12px] font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((r,i)=>(
                  <tr key={r._id} className="border-t border-neutral-100 hover:bg-neutral-50/60 transition-colors">
                    <td className="px-4 py-3 text-[12px] text-neutral-400 font-mono">{(page-1)*15+i+1}</td>
                    <td className="px-4 py-3">
                      <p className="text-[14px] font-bold text-neutral-800 whitespace-nowrap">{r.user?.name||'—'}</p>
                      <p className="text-[11px] text-neutral-400">{r.user?.email}</p>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600 whitespace-nowrap">{r.user?.phone||'—'}</td>
                    <td className="px-4 py-3 text-[13px] text-neutral-700 whitespace-nowrap">{r.project?.name||'—'}</td>
                    <td className="px-4 py-3 text-[13px] text-neutral-700 whitespace-nowrap">{r.unit?.type} {r.unit?.area}م²</td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600">الدور {r.unit?.floor||1}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-[13px] font-bold text-neutral-800">{r.unit?.price?Number(r.unit.price).toLocaleString():'—'}</span>
                      {r.unit?.price>0 && <span className="text-[10px] text-neutral-400 mr-1">ج.م</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${STATUS_COLORS[r.status]||""}`}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-neutral-500 whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={()=>openEdit(r)} className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-[#775a1a] transition-all">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {total > 15 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
            <p className="text-[13px] text-neutral-500">صفحة {page} من {Math.ceil(total/15)}</p>
            <div className="flex items-center gap-2">
              <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="h-9 px-4 rounded-lg bg-neutral-100 text-neutral-600 text-[13px] font-semibold disabled:opacity-40 hover:bg-neutral-200 transition-all">السابق</button>
              <button disabled={page>=Math.ceil(total/15)} onClick={()=>setPage(p=>p+1)} className="h-9 px-4 rounded-lg bg-neutral-100 text-neutral-600 text-[13px] font-semibold disabled:opacity-40 hover:bg-neutral-200 transition-all">التالي</button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Status Modal */}
      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,14,31,0.6)'}} onClick={e=>e.target===e.currentTarget&&setEditId(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-[18px] font-bold text-neutral-900 mb-5">تحديث حالة الحجز</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-neutral-700">الحالة الجديدة</label>
                <select value={newStatus} onChange={e=>setNewStatus(e.target.value)}
                  className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] cursor-pointer">
                  {STATUS_LIST.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-neutral-700">ملاحظة للعميل</label>
                <textarea value={adminNote} onChange={e=>setAdminNote(e.target.value)} rows={3}
                  placeholder="مثال: تم التأكيد — يرجى التواصل على 01000000000"
                  className="px-3 py-2.5 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 resize-none focus:border-[#775a1a] transition-all" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setEditId(null)} className="flex-1 h-10 rounded-xl bg-neutral-100 text-neutral-600 text-[13px] font-semibold hover:bg-neutral-200 transition-all">إلغاء</button>
              <button onClick={handleUpdate} disabled={!!updating}
                className="flex-1 h-10 rounded-xl text-white text-[13px] font-bold disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                style={{background:'#000e1f'}}>
                {updating?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />:<><span className="material-symbols-outlined text-[18px]">save</span>حفظ</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}