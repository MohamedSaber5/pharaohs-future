import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '@services/project.service.js';
import unitService from '@services/unit.service.js';
import { getImageUrl } from '@utils/imageHelper.js';

const HERO_IMG = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80';
const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

const STATUS_BADGE = {
  'تحت الإنشاء': 'bg-blue-100 text-blue-800',
  'قيد البيع': 'bg-amber-100 text-amber-800',
  'مكتمل': 'bg-green-100 text-green-800',
};

const UNIT_STATUS_BADGE = {
  'متاح': 'bg-green-100 text-green-800',
  'محجوز': 'bg-amber-100 text-amber-800',
  'مباع': 'bg-red-100 text-red-800',
};

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [featuredUnits, setFeaturedUnits] = useState([]);
  const [unitsLoading, setUnitsLoading] = useState(true);

  const [tab, setTab] = useState('شقق سكنية');

  useEffect(() => {
    // 1. Load real projects from MongoDB
    projectService
      .getAll({ limit: 6 })
      .then((res) => setFeaturedProjects(res?.data ?? res ?? []))
      .catch((err) => console.error("Error loading projects:", err))
      .finally(() => setProjectsLoading(false));

    // 2. Load real units from MongoDB
    unitService
      .getAll({ limit: 6, status: 'all' })
      .then((res) => {
        const data = res?.data ?? res;
        const list = Array.isArray(data?.units) ? data.units : Array.isArray(data) ? data : [];
        setFeaturedUnits(list);
      })
      .catch((err) => console.error("Error loading units:", err))
      .finally(() => setUnitsLoading(false));
  }, []);

  return (
    <div className='flex flex-col w-full' dir='rtl'>

      {/* 1. HERO */}
      <section className='relative w-full -mt-20 overflow-hidden bg-primary-container text-on-primary'>
        <div
          className='absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000'
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-primary via-primary-container/80 to-primary-container/60' />
        <div className='absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent' />
        <div className='absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none' />

        <div className='relative max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-36 lg:pb-44 flex flex-col justify-center min-h-[780px]'>
          <div className='inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md w-fit mb-6 shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-secondary-fixed animate-pulse' />
            <span className='font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider'>
              شركة المستقبل لتطوير وإدارة العقارات
            </span>
          </div>
          <h1 className='font-display-lg text-display-lg-mobile lg:text-display-lg text-on-primary max-w-4xl tracking-tight leading-tight lg:leading-[1.15] mb-6'>
            نبني المستقبل ونبتكر في <span className='text-secondary-fixed'>التطوير العقاري</span>
          </h1>
          <p className='font-body-lg text-body-lg text-white/75 max-w-2xl leading-relaxed mb-10'>
            نقدم باقة مختارة من أرقى الوحدات السكنية والتجارية في أفضل المواقع الاستراتيجية بأحدث معايير الجودة العالمية وخطط سداد ميسرة.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mb-14'>
            <Link
              to='/projects'
              className='inline-flex items-center justify-center gap-3 h-14 px-8 rounded-lg bg-secondary text-on-primary font-title-lg text-title-lg shadow-xl hover:bg-on-secondary-container transition-all group'
            >
              <span>استكشف المشاريع</span>
              <span className='material-symbols-outlined group-hover:-translate-x-1 transition-transform'>arrow_left_alt</span>
            </Link>
            <Link
              to='/properties'
              className='inline-flex items-center justify-center gap-3 h-14 px-8 rounded-lg bg-white/15 backdrop-blur-md text-on-primary font-title-lg text-title-lg hover:bg-white/25 transition-all'
            >
              <span className='material-symbols-outlined text-secondary-fixed'>domain</span>
              <span>تصفح الوحدات المتاحة</span>
            </Link>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 max-w-3xl'>
            {[
              { icon: 'history_edu', v: '+25 عاماً', l: 'من الخبرة والريادة' },
              { icon: 'verified', v: '100% موثوق', l: 'تراخيص معتمدة بالكامل' },
              { icon: 'gavel', v: 'التزام بالمواعيد', l: 'تسليم في الموعد المحدد' },
            ].map((b) => (
              <div key={b.v} className='flex items-center gap-3.5 bg-white/5 backdrop-blur-sm p-3.5 rounded-xl'>
                <div className='w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary-fixed'>
                  <span className='material-symbols-outlined text-[22px]'>{b.icon}</span>
                </div>
                <div>
                  <p className='font-title-md text-title-md text-on-primary font-bold'>{b.v}</p>
                  <p className='font-label-md text-label-md text-on-primary-container'>{b.l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SEARCH BOX */}
      <section className='relative z-20 max-w-7xl mx-auto px-6 lg:px-12 -mt-14 w-full'>
        <div className='bg-surface-container-lowest rounded-2xl shadow-2xl p-6 lg:p-8'>
          <div className='flex items-center gap-2 overflow-x-auto pb-4 mb-6'>
            {[
              { l: 'شقق سكنية', i: 'cottage' },
              { l: 'فيلات ودوبلكس', i: 'corporate_fare' },
              { l: 'محلات ومكاتب', i: 'storefront' },
            ].map((t) => (
              <button
                key={t.l}
                onClick={() => setTab(t.l)}
                className={`px-6 py-2.5 rounded-full font-title-md text-title-md flex items-center gap-2 transition-all whitespace-nowrap ${
                  tab === t.l
                    ? 'bg-primary-container text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className='material-symbols-outlined text-[18px]'>{t.i}</span>
                {t.l}
              </button>
            ))}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end'>
            {[
              { label: 'المدينة', icon: 'location_on', opts: ['العاصمة الإدارية', 'القاهرة الجديدة', 'مدينة نصر', 'أسوان'] },
              { label: 'نوع الوحدة', icon: 'home_work', opts: ['شقة فاخرة', 'دوبلكس', 'بنتهاوس', 'محل تجاري'] },
              { label: 'نطاق السعر', icon: 'payments', opts: ['أقل من 3 مليون', '3 - 6 مليون', '6 - 10 مليون', '+10 مليون'] },
              { label: 'المشروع', icon: 'apartment', opts: ['سيليا', 'حكايه', 'تيت'] },
            ].map((f) => (
              <div key={f.label} className='flex flex-col gap-1.5'>
                <label className='font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5'>
                  <span className='material-symbols-outlined text-secondary text-[16px]'>{f.icon}</span>
                  {f.label}
                </label>
                <div className='relative'>
                  <select className='w-full h-12 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer'>
                    <option value=''>الكل</option>
                    {f.opts.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]'>
                    keyboard_arrow_down
                  </span>
                </div>
              </div>
            ))}
            <Link
              to='/properties'
              className='h-12 px-6 rounded-lg bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-lg'
            >
              <span className='material-symbols-outlined text-[20px]'>search</span>
              بحث في الوحدات
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS (From MongoDB) */}
      <section id='projects' className='max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 w-full'>
        <div className='flex items-end justify-between mb-10'>
          <div>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold mb-3'>
              <span className='material-symbols-outlined text-[16px]'>apartment</span>
              المشاريع العقارية
            </div>
            <h2 className='font-headline-lg text-headline-lg text-on-surface leading-tight'>
              أحدث مشاريعنا المتميزة<br />
              <span className='text-secondary'>تصاميم معمارية فريدة</span>
            </h2>
          </div>
          <Link
            to='/projects'
            className='hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant font-title-md text-title-md hover:bg-surface-container transition-all'
          >
            عرض كافة المشاريع
            <span className='material-symbols-outlined text-[18px]'>arrow_left_alt</span>
          </Link>
        </div>

        {projectsLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm'>
                <div className='aspect-[4/3] bg-neutral-100 animate-pulse' />
                <div className='p-5 flex flex-col gap-3'>
                  <div className='h-4 bg-neutral-100 animate-pulse rounded-lg w-3/4' />
                  <div className='h-4 bg-neutral-100 animate-pulse rounded-lg w-1/2' />
                </div>
              </div>
            ))}
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className='col-span-3 flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-neutral-100'>
            <span className='material-symbols-outlined text-[56px] text-neutral-300 mb-4'>apartment</span>
            <h3 className='text-[18px] font-bold text-neutral-600 mb-2'>لا توجد مشاريع مضافة بعد</h3>
            <p className='text-[14px] text-neutral-400'>يمكنك إضافة المشاريع من لوحة تحكم المسؤول</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {featuredProjects.map((p) => {
              const pImg = p.images?.[0] ? getImageUrl(p.images[0]) : PLACEHOLDER_IMG;
              return (
                <div
                  key={p._id}
                  className='group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between'
                >
                  <div>
                    <div className='relative aspect-[4/3] overflow-hidden bg-neutral-100'>
                      <img
                        src={pImg}
                        alt={p.name}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                        onError={(e) => {
                          e.target.src = PLACEHOLDER_IMG;
                        }}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-[#000e1f]/70 to-transparent' />
                      <div className='absolute top-3 right-3'>
                        <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap ${
                          STATUS_BADGE[p.status] || 'bg-white/90 text-neutral-800'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <div className='absolute bottom-3 right-3 left-3'>
                        <p className='text-[12px] text-white/70 mb-0.5 flex items-center gap-1'>
                          <span className='material-symbols-outlined text-[14px]'>location_on</span>
                          {p.location}
                        </p>
                        <p className='text-[16px] text-white font-bold leading-tight'>{p.name}</p>
                      </div>
                    </div>
                    <div className='p-5'>
                      <div className='grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-neutral-100'>
                        {[
                          { i: 'straighten', l: 'المساحة', v: p.totalArea ? `${p.totalArea} م²` : '-' },
                          { i: 'holiday_village', l: 'الوحدات', v: `${p.unitCount ?? p.totalUnits ?? 0} وحدة` },
                          { i: 'event_available', l: 'التسليم', v: p.delivery || '-' },
                        ].map((m) => (
                          <div key={m.l} className='flex flex-col items-center text-center gap-0.5'>
                            <span className='material-symbols-outlined text-[18px]' style={{ color: '#775a1a' }}>
                              {m.i}
                            </span>
                            <span className='text-[11px] text-neutral-400'>{m.l}</span>
                            <span className='text-[12px] font-bold text-neutral-800 leading-tight'>{m.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='p-5 pt-0 flex items-center justify-between'>
                    <div>
                      <p className='text-[11px] text-neutral-400'>يبدأ السعر من</p>
                      <p className='text-[15px] font-bold text-neutral-900'>
                        {p.startPrice ? Number(p.startPrice).toLocaleString() : 'غير محدد'}
                        {p.startPrice > 0 && <span className='text-[11px] text-neutral-400 font-normal mr-1'>ج.م.</span>}
                      </p>
                    </div>
                    <Link
                      to={`/projects/${p._id}`}
                      className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all shadow-sm'
                      style={{ background: '#000e1f' }}
                    >
                      عرض التفاصيل
                      <span className='material-symbols-outlined text-[16px]'>arrow_left_alt</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. STATS */}
      <section className='bg-primary-container py-12'>
        <div className='max-w-7xl mx-auto px-6 lg:px-12'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 text-center'>
            {[
              { i: 'history_edu', v: '+25', l: 'عاماً من الخبرة' },
              { i: 'apartment', v: '+20', l: 'مشروعاً مميزاً' },
              { i: 'holiday_village', v: '+2000', l: 'وحدة تم تسليمها' },
              { i: 'verified', v: '98%', l: 'نسبة رضا العملاء' },
            ].map((s) => (
              <div key={s.l} className='flex flex-col items-center gap-2'>
                <div className='w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-fixed mb-1'>
                  <span className='material-symbols-outlined text-[22px]'>{s.i}</span>
                </div>
                <p className='font-financial-numeric text-on-primary font-bold text-3xl'>{s.v}</p>
                <p className='font-label-md text-label-md text-on-primary-container'>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REAL UNITS (From MongoDB - Zero Fake Data!) */}
      <section id='available-units' className='max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 w-full'>
        <div className='flex items-end justify-between mb-10'>
          <div>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold mb-3'>
              <span className='material-symbols-outlined text-[16px]'>domain</span>
              الوحدات الحقيقية المتاحة
            </div>
            <h2 className='font-headline-lg text-headline-lg text-on-surface leading-tight'>
              وحدات سكنية وتجارية مختارة<br />
              <span className='text-secondary'>من قاعدة البيانات مباشرة</span>
            </h2>
          </div>
          <Link
            to='/properties'
            className='hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant font-title-md text-title-md hover:bg-surface-container transition-all'
          >
            عرض كافة الوحدات
            <span className='material-symbols-outlined text-[18px]'>arrow_left_alt</span>
          </Link>
        </div>

        {unitsLoading ? (
          <div className='flex flex-col gap-4'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 animate-pulse h-40' />
            ))}
          </div>
        ) : featuredUnits.length === 0 ? (
          <div className='bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30 flex flex-col items-center justify-center'>
            <span className='material-symbols-outlined text-[48px] text-outline mb-3'>domain_disabled</span>
            <h3 className='text-[17px] font-bold text-on-surface mb-1'>لا توجد وحدات متاحة حالياً</h3>
            <p className='text-[13px] text-on-surface-variant mb-4'>يمكنك إضافة وحدات جديدة من لوحة التحكم</p>
            <Link
              to='/admin/units'
              className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold'
            >
              إضافة وحدات
            </Link>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            {featuredUnits.map((u) => {
              const uImg = u.images?.[0]
                ? getImageUrl(u.images[0])
                : u.project?.images?.[0]
                ? getImageUrl(u.project.images[0])
                : PLACEHOLDER_IMG;

              const projectName = u.project?.name || 'مشروع متميز';
              const location = u.project?.location || u.building || 'موقع استراتيجي';
              const priceFmt = u.price ? Number(u.price).toLocaleString() : 'غير محدد';

              return (
                <div
                  key={u._id}
                  className='group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row'
                >
                  <div className='w-full sm:w-56 h-48 sm:h-auto flex-shrink-0 overflow-hidden bg-neutral-100 relative'>
                    <img
                      src={uImg}
                      alt={u.type}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      onError={(e) => {
                        e.target.src = PLACEHOLDER_IMG;
                      }}
                    />
                    <div className='sm:hidden absolute top-3 right-3'>
                      <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold whitespace-nowrap ${
                        UNIT_STATUS_BADGE[u.status] || 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {u.status}
                      </span>
                    </div>
                  </div>

                  <div className='flex-1 p-5 flex flex-col justify-between'>
                    <div>
                      <div className='flex items-start justify-between gap-4 mb-2'>
                        <div>
                          <p className='font-label-md text-label-md text-on-surface-variant'>
                            {projectName} — {location}
                          </p>
                          <h3 className='font-title-lg text-title-lg text-on-surface font-bold'>
                            {u.type} {u.rooms ? `(${u.rooms} غرف)` : ''}
                          </h3>
                        </div>
                        <span className={`hidden sm:inline-block px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold whitespace-nowrap ${
                          UNIT_STATUS_BADGE[u.status] || 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {u.status}
                        </span>
                      </div>

                      <div className='flex items-center gap-5 text-on-surface-variant flex-wrap mt-3'>
                        {[
                          { i: 'straighten', l: `${u.area} م²` },
                          { i: 'layers', l: `الدور ${u.floor ?? 1}` },
                          { i: 'construction', l: u.finishing || 'تشطيب كامل' },
                          ...(u.bathrooms ? [{ i: 'bathtub', l: `${u.bathrooms} حمام` }] : []),
                        ].map((m) => (
                          <span key={m.l} className='flex items-center gap-1.5 font-body-md text-body-md'>
                            <span className='material-symbols-outlined text-secondary text-[18px]'>{m.i}</span>
                            {m.l}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className='flex items-center justify-between mt-4 pt-4 border-t border-outline-variant/30'>
                      <div>
                        <p className='font-label-sm text-label-sm text-on-surface-variant'>السعر الإجمالي</p>
                        <p className='font-financial-numeric text-financial-numeric text-on-surface font-bold'>
                          {priceFmt} <span className='font-label-md text-label-md text-on-surface-variant'>ج.م.</span>
                        </p>
                      </div>
                      <Link
                        to={`/properties/${u._id}`}
                        className='inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all text-sm shadow-sm'
                      >
                        تفاصيل الوحدة
                        <span className='material-symbols-outlined text-[16px]'>arrow_left_alt</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. CTA / CONTACT */}
      <section className='relative overflow-hidden bg-primary py-16 lg:py-24'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-primary opacity-90' />
        <div className='absolute top-0 left-0 w-80 h-80 rounded-full bg-secondary/10 -translate-x-1/2 -translate-y-1/2 blur-3xl' />
        <div className='relative max-w-7xl mx-auto px-6 lg:px-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-fixed font-label-sm text-label-sm font-semibold mb-6'>
                <span className='material-symbols-outlined text-[16px]'>support_agent</span>
                استشارة عقارية مجانية
              </div>
              <h2 className='font-headline-lg text-headline-lg text-on-primary leading-tight mb-4'>
                هل تبحث عن وحدة بمواصفات خاصة؟<br />
                <span className='text-secondary-fixed'>فريقنا جاهز لمساعدتك</span>
              </h2>
              <p className='font-body-lg text-body-lg text-white/75 leading-relaxed mb-6'>
                تواصل مع مستشارينا العقاريين لاختيار الوحدة الأنسب لاحتياجاتك واستثمارك بأفضل خطط السداد المتاحة.
              </p>
              <div className='flex flex-col gap-3'>
                {[
                  'تحديد أفضل الخيارات الاستثمارية المناسبة لميزانيتك',
                  'شرح كامل لخطط السداد والأقساط والخصومات',
                  'معاينة حية للمواقع والمشاريع على أرض الواقع',
                ].map((f) => (
                  <div key={f} className='flex items-center gap-3'>
                    <div className='w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0'>
                      <span className='material-symbols-outlined text-[14px] text-on-primary'>check</span>
                    </div>
                    <span className='font-body-md text-body-md text-white/80'>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-2xl'>
              <h3 className='font-headline-sm text-headline-sm text-on-surface font-bold mb-1'>طلب استشارة عقارية</h3>
              <p className='font-body-md text-body-md text-on-surface-variant mb-6'>اترك بياناتك وسيتواصل معك مستشار عقاري فوراً</p>
              <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
                <div className='flex flex-col gap-1.5'>
                  <label className='font-label-md text-label-md text-on-surface-variant'>الاسم بالكامل</label>
                  <div className='relative'>
                    <input
                      placeholder='مثال: محمد أحمد'
                      className='w-full h-12 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md focus:outline-none focus:ring-1 focus:ring-secondary'
                    />
                    <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]'>
                      person
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='font-label-md text-label-md text-on-surface-variant'>رقم الهاتف</label>
                  <div className='relative'>
                    <input
                      type='tel'
                      placeholder='+20 100 000 0000'
                      dir='ltr'
                      className='w-full h-12 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-financial-numeric text-financial-numeric text-right focus:outline-none focus:ring-1 focus:ring-secondary'
                    />
                    <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]'>
                      call
                    </span>
                  </div>
                </div>
                <button
                  type='submit'
                  className='w-full h-12 rounded-lg bg-secondary text-on-primary hover:bg-on-secondary-container font-title-lg text-title-lg transition-all shadow-lg flex items-center justify-center gap-2 mt-2'
                >
                  <span>إرسال طلب الاستشارة</span>
                  <span className='material-symbols-outlined text-[20px]'>send</span>
                </button>
                <div className='flex items-center justify-center gap-2 text-outline font-label-sm text-label-sm'>
                  <span className='material-symbols-outlined text-[16px]'>lock</span>
                  <span>بياناتك محمية ومحفوظة بأعلى درجات الخصوصية</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
