import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface shadow-[0_-1px_12px_rgba(16,36,58,0.03)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl pb-space-xl">

          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-secondary-fixed">
                <span className="material-symbols-outlined text-[22px]">account_balance</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="font-title-lg text-title-lg text-primary">مستقبل الفراعنة</span>
                <span className="font-label-sm text-label-sm text-secondary">للاستثمار والتطوير العقاري الفاخر</span>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed">
              مؤسسة تطويرية عقارية رائدة تسعى نحو الفخامة والتميز في مجال تطوير المجتمعات السكنية والاستثمارية في مصر.
            </p>
            <div className="flex items-center gap-3 pt-space-xs">
              {["call","mail","location_on"].map(icon => (
                <div key={icon} className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-title-md text-title-md text-primary font-bold">المناطق والمشروعات</h4>
            <ul className="flex flex-col gap-2.5 text-on-surface-variant font-body-md text-body-md">
              {["العاصمة الإدارية الجديدة","القاهرة الجديدة والتجمع","الساحل الشمالي المميز","مدينة الشيخ زايد","العقارات التجارية المتميزة"].map(a => (
                <li key={a}><Link to="/projects" className="hover:text-secondary transition-colors">{a}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-title-md text-title-md text-primary font-bold">خدمات المستثمرين</h4>
            <ul className="flex flex-col gap-2.5 text-on-surface-variant font-body-md text-body-md">
              {["المحافظ الاستثمارية","إدارة الوحدات والإيجار","الاستشارات والتحليل المالي","مبادرة القطن المدعوم","الاستثمارات المالية للمغترب"].map(s => (
                <li key={s}><a href="#" className="hover:text-secondary transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-title-md text-title-md text-primary font-bold">مركز التواصل المجاني</h4>
            <div className="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">support_agent</span>
                <span className="font-financial-numeric text-financial-numeric text-primary">+20 2 2840 9000</span>
              </div>
              <p className="font-label-md text-label-md text-outline">متاح لاتخاذ الاستفسارات من السبت حتى الخميس.</p>
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-secondary font-bold">شهادة هيئة المشروعات العمرانية</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">سجل تجاري مصري معتمد رقم 4892/2021</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-md text-label-md border-t border-outline-variant/30">
          <div className="flex items-center gap-space-md flex-wrap justify-center">
            <span className="text-primary font-bold">جميع الحقوق محفوظة © 2025</span>
            <span>شركة مستقبل الفراعنة للاستثمار والتطوير العقاري ش.م.م.</span>
          </div>
          <div className="flex items-center gap-space-md">
            <Link to="/privacy"  className="hover:text-on-surface transition-colors">سياسة الخصوصية</Link>
            <span className="text-outline-variant">·</span>
            <Link to="/terms"    className="hover:text-on-surface transition-colors">الشروط والأحكام</Link>
            <span className="text-outline-variant">·</span>
            <Link to="/sitemap"  className="hover:text-on-surface transition-colors">ميثاق الحوكمة</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
