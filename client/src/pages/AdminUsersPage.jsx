import { useState, useEffect, useCallback } from 'react';
import adminService from '@services/admin.service.js';
import toast from 'react-hot-toast';

const ROLE_LABELS = { user: 'عميل', employee: 'موظف مبيعات', admin: 'مسؤول' };
const ROLE_COLORS = {
  user:     'bg-blue-100 text-blue-800',
  employee: 'bg-amber-100 text-amber-800',
  admin:    'bg-red-100 text-red-800',
};

export default function AdminUsersPage() {
  const [users,    setUsers]    = useState([]);
  const [total,    setTotal]    = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleF,    setRoleF]    = useState('all');
  const [page,     setPage]     = useState(1);

  const [editUser, setEditUser] = useState(null); // user being edited
  const [newRole,  setNewRole]  = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [saving,   setSaving]   = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(handler);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const p = { page, limit: 20 };
      if (debouncedSearch.trim()) p.search = debouncedSearch.trim();
      if (roleF !== 'all') p.role = roleF;
      const res = await adminService.getUsers(p);
      const d = res?.data ?? res;
      setUsers(d?.users ?? []);
      setTotal(d?.total ?? 0);
    } catch { toast.error('تعذّر تحميل المستخدمين'); }
    finally { setLoading(false); }
  }, [debouncedSearch, roleF, page]);

  useEffect(() => { load(); }, [load]);

  const openEdit = (u) => {
    setEditUser(u);
    setNewRole(u.role);
    setWhatsapp(u.whatsapp || '');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminService.updateRole(editUser._id, newRole);
      if (newRole === 'employee' && whatsapp) {
        await adminService.updateWhatsapp(editUser._id, whatsapp);
      }
      toast.success('تم تحديث المستخدم ✅');
      setEditUser(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'حدث خطأ');
    } finally { setSaving(false); }
  };

  const pages = Math.ceil(total / 20) || 1;

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6" style={{background:'#f8f9fa',minHeight:'100vh'}}>
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-neutral-900">إدارة المستخدمين</h1>
        <p className="text-[13px] text-neutral-500 mt-0.5">إجمالي {total} مستخدم</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[20px]">search</span>
          <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
            placeholder="بحث باسم أو إيميل أو هاتف..."
            className="w-full h-10 pr-10 pl-4 rounded-xl border border-neutral-200 text-[13px] outline-none focus:border-[#775a1a] transition-all"/>
        </div>
        {['all','user','employee','admin'].map(r=>(
          <button key={r} onClick={()=>{setRoleF(r);setPage(1);}}
            className={`h-9 px-4 rounded-lg text-[12px] font-bold transition-all ${roleF===r?'text-white':'text-neutral-500 bg-neutral-100 hover:bg-neutral-200'}`}
            style={roleF===r?{background:'#000e1f'}:{}}>
            {r==='all'?'الكل':ROLE_LABELS[r]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex flex-col gap-3">{[1,2,3,4,5].map(i=><div key={i} className="h-12 bg-neutral-100 rounded-xl animate-pulse"/>)}</div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <span className="material-symbols-outlined text-[56px] text-neutral-300 mb-3">group</span>
            <p className="text-neutral-500">لا يوجد مستخدمون</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{background:'#f8f9fa',borderBottom:'1px solid #f1f3f4'}}>
                  {['#','الاسم','البريد الإلكتروني','الهاتف','الدور','واتساب الموظف','تاريخ الإنشاء','إجراءات'].map(h=>(
                    <th key={h} className="px-4 py-3 text-right text-[11px] font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u,i)=>(
                  <tr key={u._id} className="border-t border-neutral-100 hover:bg-neutral-50/60 transition-colors">
                    <td className="px-4 py-3 text-[12px] text-neutral-400">{(page-1)*20+i+1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] text-white flex-shrink-0"
                          style={{background:'#000e1f'}}>{u.name?.[0]?.toUpperCase()||'?'}</div>
                        <span className="text-[13px] font-semibold text-neutral-800 whitespace-nowrap">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-neutral-600">{u.email}</td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600">{u.phone||'—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${ROLE_COLORS[u.role]||''}`}>{ROLE_LABELS[u.role]||u.role}</span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-neutral-600">{u.whatsapp||'—'}</td>
                    <td className="px-4 py-3 text-[11px] text-neutral-400 whitespace-nowrap">{new Date(u.createdAt).toLocaleDateString('ar-EG')}</td>
                    <td className="px-4 py-3">
                      <button onClick={()=>openEdit(u)}
                        className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold text-[#775a1a] bg-amber-50 hover:bg-amber-100 transition-all">
                        <span className="material-symbols-outlined text-[14px]">manage_accounts</span>تعديل
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
            <p className="text-[12px] text-neutral-500">صفحة {page} من {pages}</p>
            <div className="flex gap-2">
              <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="h-8 px-3 rounded-lg bg-neutral-100 text-[12px] disabled:opacity-40">السابق</button>
              <button disabled={page>=pages} onClick={()=>setPage(p=>p+1)} className="h-8 px-3 rounded-lg bg-neutral-100 text-[12px] disabled:opacity-40">التالي</button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Role Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,14,31,0.65)'}} onClick={e=>e.target===e.currentTarget&&!saving&&setEditUser(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[18px] font-bold text-neutral-900">تعديل المستخدم</h3>
                <p className="text-[13px] text-neutral-500 mt-0.5">{editUser.name} • {editUser.email}</p>
              </div>
              <button onClick={()=>setEditUser(null)} className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center hover:bg-neutral-200">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Role selector */}
              <div>
                <label className="text-[13px] font-semibold text-neutral-700 mb-2 block">تغيير الدور</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {role:'user',     label:'عميل',           icon:'person',          desc:'يمكنه الحجز فقط'},
                    {role:'employee', label:'موظف مبيعات',    icon:'support_agent',   desc:'يتابع الحجوزات'},
                    {role:'admin',    label:'مسؤول',          icon:'admin_panel_settings', desc:'كامل الصلاحيات'},
                  ].map(r=>(
                    <button key={r.role} onClick={()=>setNewRole(r.role)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all ${newRole===r.role?'border-[#775a1a] bg-amber-50':'border-neutral-200 hover:border-neutral-300'}`}>
                      <span className="material-symbols-outlined text-[24px]" style={{color:newRole===r.role?'#775a1a':'#9ca3af'}}>{r.icon}</span>
                      <span className="text-[12px] font-bold text-neutral-800">{r.label}</span>
                      <span className="text-[10px] text-neutral-400 text-center">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* WhatsApp (only for employee) */}
              {newRole === 'employee' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[13px] font-semibold text-neutral-700">رقم واتساب الموظف</label>
                    <span className={`text-[11px] font-mono ${whatsapp.length === 11 ? 'text-green-600 font-bold' : 'text-neutral-400'}`}>
                      {whatsapp.length}/11
                    </span>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[20px]">call</span>
                    <input
                      type="tel"
                      maxLength={11}
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, 11))}
                      placeholder="01012345678"
                      className="w-full h-11 pr-10 pl-4 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">يجب أن يتكون من 11 رقماً ويبدأ بـ (010, 011, 012, 015)</p>
                </div>
              )}

              {/* Warning if changing from employee */}
              {editUser.role === 'employee' && newRole !== 'employee' && (
                <div className="p-3 rounded-xl" style={{background:'#fef2f2',border:'1px solid #fecaca'}}>
                  <p className="text-[12px] text-red-700"><span className="font-bold">تنبيه:</span> إزالة دور الموظف سيلغي تعيينه من الحجوزات النشطة.</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={()=>setEditUser(null)} className="flex-1 h-11 rounded-xl bg-neutral-100 text-neutral-600 font-semibold hover:bg-neutral-200 transition-all">إلغاء</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 h-11 rounded-xl text-white font-bold disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md"
                style={{background:'#000e1f'}}>
                {saving?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:<><span className="material-symbols-outlined text-[18px]">save</span>حفظ التغييرات</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}