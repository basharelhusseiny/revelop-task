import { Search } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";

const SearchBar = () => {
  const { t, language } = useTranslation();
  return (
    <div className="hidden sm:block relative h-[38px] w-[230px]">
      <Search
        className={`absolute mt-2.5 ${
          language === "ar" ? "right-2.5" : "left-2.5"
        } text-(--text-icons)`}
        size={16}
      />
      <input
        type="search"
        placeholder={t("navbar.search") + "..."}
        className={`outline-0 bg-[#f3f3f9] dark:bg-[#202328] py-2 w-full h-full dark:text-white rounded-sm placeholder:text-(--text-icons) placeholder:text-sm ${
          language === "ar"
            ? "pr-10 pl-[30px] text-right"
            : "pl-10 pr-[30px] text-left"
        }`}
      />
    </div>
  );
};

export default SearchBar;
