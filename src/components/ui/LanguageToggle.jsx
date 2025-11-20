import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Globe } from "lucide-react";
import { toggleLanguage } from "../../store/languageSlice";
import useTranslation from "../../hooks/useTranslation";

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { language } = useTranslation();

  const languages = [
    { code: "ar", nameEn: "العربية", nameAr: "العربية" },
    { code: "en", nameEn: "English", nameAr: "English" },
    { code: "fr", nameEn: "Francis", nameAr: "Francis" },
  ];

  const handleLanguageSelect = (langCode) => {
    if (langCode !== language) {
      dispatch(toggleLanguage(langCode));
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* زر Globe */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 hover:bg-[#cfecfc] text-(--text-icons) flex items-center justify-center rounded-full duration-200 transition-colors cursor-pointer"
      >
        <Globe size={22} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute ${
            language === "en" ? "right-0" : "right-0"
          } top-14 w-40 mb-2 bg-(--bg-divider) rounded-xs shadow-lg overflow-hidden z-50`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`flex items-center gap-3 px-5 py-2 w-full text-sm rounded-xs text-left hover:bg-gray-200 transition-colors cursor-pointer`}
            >
              <span className="text-(--text-icons) font-medium">
                {language === "ar" ? lang.nameAr : lang.nameEn}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
