import {
  House,
  CircleUser,
  ChartNoAxesColumn,
  Cog,
  ChevronRight,
} from "lucide-react";
import useTranslation from "../../hooks/useTranslation";

const Sidebar = ({ isCollapsed }) => {
  const { t, language } = useTranslation();

  const sideLinks = [
    {
      id: 1,
      title: t("sidebar.home"),
      icon: House,
    },
    {
      id: 2,
      title: t("sidebar.accounts"),
      icon: CircleUser,
    },
    {
      id: 3,
      title: t("sidebar.inventory"),
      icon: ChartNoAxesColumn,
    },
    {
      id: 4,
      title: t("sidebar.fixedAssets"),
      icon: Cog,
    },
  ];
  return (
    <div
      className={`${
        isCollapsed ? "w-[70px]" : "w-[250px] "
      } bg-(--bg-sidebar) px-5 h-screen fixed`}
    >
      <div className="w-full h-[70px] flex items-center justify-center">
        {!isCollapsed ? (
          <img
            src="/images/main_logo.png"
            alt="logo"
            className="w-[120px] h-[30px]"
          />
        ) : (
          <img src="/images/logo-sm.png" alt="logo" />
        )}
      </div>
      <div>
        {!isCollapsed && (
          <span
            className={`uppercase text-[11px] font-bold text-[#838fb9] dark:text-[#5f6270] h-10 flex items-center`}
          >
            {t("sidebar.menu")}
          </span>
        )}
        <ul className="text-(--text-sidebar) ">
          {sideLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li
                key={link.id}
                className={`${
                  isCollapsed ? "py-4 px-1" : "py-3"
                } text-[15px] hover:text-white duration-300 transition-colors`}
              >
                <button className="w-full flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-2.5">
                    <Icon size={`${isCollapsed ? 26 : 18}`} />
                    {!isCollapsed && <span>{link.title}</span>}
                  </span>
                  {!isCollapsed && link.title !== t("sidebar.home") && (
                    <ChevronRight
                      size={14}
                      className={`${
                        language === "en" ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
