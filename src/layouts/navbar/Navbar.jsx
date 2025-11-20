import { Kanban, LayoutDashboard, MoveRight, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/sidebarSlice";
import ThemeToggle from "../../components/ui/ThemeToggle";
import FullscreenButton from "../../components/ui/FullScreenToggle";
import LanguageToggle from "../../components/ui/LanguageToggle";
import SearchBar from "./SearchBar";
import ProfileData from "./ProfileData";
import useTranslation from "../../hooks/useTranslation";

const Navbar = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const { language } = useTranslation();

  return (
    <div
      className={`fixed z-40 top-0 ${
        language === "en" ? "right-0" : "left-0"
      }  ${
        isCollapsed
          ? "w-full md:w-[calc(100vw-87px)]"
          : "w-full md:w-[calc(100vw-267px)]"
      } h-[70px] px-3 flex items-center bg-(--bg-divider) border-b border-gray-200 dark:border-0`}
    >
      <div className="w-full flex items-center justify-between">
        {/*  Collapsed Icon with searchbar */}
        <div className="flex items-center">
          {/* Sidebar toggle */}
          <button onClick={() => dispatch(toggleSidebar())} className="px-4">
            {isCollapsed ? (
              <MoveRight
                className={`text-(--text-icons) ${
                  language === "en" ? "" : "rotate-180"
                } cursor-pointer`}
              />
            ) : (
              <Kanban
                className={`text-(--text-icons) ${
                  language === "en" ? "-rotate-90" : "rotate-90"
                } cursor-pointer`}
              />
            )}
          </button>

          {/* Search input */}
          <SearchBar />
        </div>
        <div className="hidden sm:block text-(--text-base) text-sm">Ican</div>

        {/* Icons with profile */}
        <div className="flex items-center">
          <div className="flex space-x-2">
            <LanguageToggle />
            <button className="w-10 h-10 hover:bg-[#d6ecf8] flex items-center justify-center rounded-full duration-200 transition-colors cursor-pointer">
              <LayoutDashboard size={22} className="text-(--text-icons)" />
            </button>
            <button className="flex sm:hidden w-10 h-10 hover:bg-[#d6ecf8]  items-center justify-center rounded-full duration-200 transition-colors cursor-pointer">
              <User size={22} className="text-(--text-icons)" />
            </button>
            <FullscreenButton />
            <ThemeToggle />
          </div>

          {/*  Profile Data  */}
          <ProfileData />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
