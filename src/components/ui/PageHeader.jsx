import { ChevronRight } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";

const PageHeader = () => {
  const { t, language } = useTranslation();
  return (
    <div className="w-full bg-(--bg-secondary) shadow h-10 flex items-center justify-between px-6">
      <span className="font-bold uppercase text-[#495057] dark:text-[#ced4da]">
        {t("sidebar.accounts")}
      </span>
      <div className="flex items-center gap-2 text-[13px]">
        <span className="text-black dark:text-[#ced4da]">
          {t("sidebar.home")}
        </span>
        <ChevronRight
          size={14}
          className={`text-(--text-icons) ${
            language === "en" ? "rotate-0" : "rotate-180"
          }`}
        />
        <span className="text-(--text-icons)">{t("sidebar.accounts")}</span>
      </div>
    </div>
  );
};

export default PageHeader;
