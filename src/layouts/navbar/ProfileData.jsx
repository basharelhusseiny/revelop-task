import { User } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";

const ProfileData = () => {
  const { language, t } = useTranslation();

  return (
    <div
      className={`${
        language === "en" ? "ml-4" : "mr-4"
      } hidden sm:flex bg-[#f3f3f9] dark:bg-[#31373c] h-[70px]  items-center`}
    >
      <div className="h-[55px] w-full py-1 px-4 flex gap-2 items-center justify-center">
        <div className="w-8 h-8 bg-[#ffffff]  flex items-center justify-center rounded-full">
          <User className="text-(--text-icons)" size={22} />
        </div>
        <div className=" hidden lg:flex flex-col text-[12px]">
          <span className="text-(--text-base) text-sm">test3</span>
          <span className="text-(--text-icons)">{t("navbar.accountant")}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
