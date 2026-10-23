import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations } from "@i18n/translations.js";

const LanguageContext = createContext(null);

const STORAGE_KEY = "pharaohs_language";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ar" || saved === "en") return saved;
    } catch (_) {}
    return "ar";
  });

  const isRTL = language === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  // Synchronize document direction, lang attribute, and font family
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (_) {}

    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.dir = dir;

    if (isRTL) {
      document.body.classList.remove("font-latin");
      document.body.classList.add("font-arabic");
    } else {
      document.body.classList.remove("font-arabic");
      document.body.classList.add("font-latin");
    }
  }, [language, dir, isRTL]);

  const setLanguage = useCallback((newLang) => {
    if (newLang === "ar" || newLang === "en") {
      setLanguageState(newLang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  // Translation helper: t('nav.home', 'الرئيسية')
  const t = useCallback(
    (path, fallback = "") => {
      const currentDict = translations[language] || translations.ar;
      const keys = path.split(".");
      let val = currentDict;

      for (const k of keys) {
        if (val && typeof val === "object" && k in val) {
          val = val[k];
        } else {
          // Fallback to Arabic dictionary if key is missing in English
          let fallbackVal = translations.ar;
          for (const fbKey of keys) {
            if (fallbackVal && typeof fallbackVal === "object" && fbKey in fallbackVal) {
              fallbackVal = fallbackVal[fbKey];
            } else {
              fallbackVal = null;
              break;
            }
          }
          return fallbackVal || fallback || path;
        }
      }

      return typeof val === "string" ? val : fallback || path;
    },
    [language]
  );

  // Status translator (project, unit, reservation)
  const tStatus = useCallback(
    (status) => {
      if (!status) return "";
      const map = {
        // Project statuses
        "تحت الإنشاء": isRTL ? "تحت الإنشاء" : "Under Construction",
        "under_construction": isRTL ? "تحت الإنشاء" : "Under Construction",
        "قيد البيع": isRTL ? "قيد البيع" : "For Sale",
        "for_sale": isRTL ? "قيد البيع" : "For Sale",
        "مكتمل": isRTL ? "مكتمل" : "Completed",
        "completed": isRTL ? "مكتمل" : "Completed",

        // Unit statuses
        "متاح": isRTL ? "متاح" : "Available",
        "available": isRTL ? "متاح" : "Available",
        "محجوز": isRTL ? "محجوز" : "Reserved",
        "reserved": isRTL ? "محجوز" : "Reserved",
        "مباع": isRTL ? "مباع" : "Sold",
        "sold": isRTL ? "مباع" : "Sold",

        // Reservation statuses
        "pending": isRTL ? "قيد المراجعة" : "Pending",
        "confirmed": isRTL ? "مؤكد" : "Confirmed",
        "cancelled": isRTL ? "ملغي" : "Cancelled",
        "completed_deal": isRTL ? "صفقة مكتملة" : "Completed Deal",
      };

      const normalized = String(status).trim().toLowerCase();
      return map[status] || map[normalized] || status;
    },
    [isRTL]
  );

  // Property type translator
  const tType = useCallback(
    (type) => {
      if (!type) return "";
      const map = {
        residential: isRTL ? "سكني" : "Residential",
        commercial: isRTL ? "تجاري" : "Commercial",
        administrative: isRTL ? "إداري" : "Administrative",
        villa: isRTL ? "فيلا" : "Villa",
        apartment: isRTL ? "شقة فاخرة" : "Apartment",
        duplex: isRTL ? "دوبلكس" : "Duplex",
        penthouse: isRTL ? "بنتهاوس" : "Penthouse",
        studio: isRTL ? "استوديو" : "Studio",
        shop: isRTL ? "محل تجاري" : "Commercial Store",
        office: isRTL ? "مكتب إداري" : "Office Space",
        clinic: isRTL ? "عيادة طبية" : "Medical Clinic",
      };

      const normalized = String(type).trim().toLowerCase();
      return map[normalized] || type;
    },
    [isRTL]
  );

  // Currency formatter
  const formatPrice = useCallback(
    (price) => {
      if (price === undefined || price === null || isNaN(price)) return "";
      const formatted = Number(price).toLocaleString(language === "ar" ? "ar-EG" : "en-US");
      return isRTL ? `${formatted} ج.م` : `${formatted} EGP`;
    },
    [language, isRTL]
  );

  // Area formatter
  const formatArea = useCallback(
    (sqm) => {
      if (!sqm) return "";
      const formatted = Number(sqm).toLocaleString(language === "ar" ? "ar-EG" : "en-US");
      return isRTL ? `${formatted} م²` : `${formatted} sqm`;
    },
    [language, isRTL]
  );

  const value = {
    language,
    lang: language,
    isRTL,
    dir,
    setLanguage,
    toggleLanguage,
    t,
    tStatus,
    tType,
    formatPrice,
    formatArea,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
};
