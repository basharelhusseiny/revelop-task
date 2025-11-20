import { Search } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";

const PagesSearchBar = ({ width }) => {
  const { t, language } = useTranslation();

  return (
    <div
      className={`${width} relative h-[38px] border border-gray-300 dark:border-0 rounded-sm`}
    >
      <Search
        className={`absolute mt-2.5 ${
          language === "ar" ? "right-2.5" : "left-2.5"
        } text-(--text-icons)`}
        size={14}
      />
      <input
        type="search"
        placeholder={t("accounts.searchPlaceholder")}
        className={`outline-0 bg-white dark:bg-[#262a2f]  py-2 w-full h-full rounded-sm placeholder:text-(--text-icons) placeholder:text-[13px] dark:text-white ${
          language === "ar"
            ? "pr-10 pl-[30px] text-right"
            : "pl-10 pr-[30px] text-left"
        }`}
      />
    </div>
  );
};

export default PagesSearchBar;
