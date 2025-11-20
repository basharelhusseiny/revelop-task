import { useEffect } from "react";
import useTranslation from "../hooks/useTranslation";
import Sidebar from "./sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../store/sidebarSlice";

const RootLayout = ({ children }) => {
  const { language } = useTranslation();
  const { isCollapsed, isHidden } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 1024) {
        dispatch(setSidebar({ collapsed: false, hidden: false }));
      } else if (width > 768) {
        dispatch(setSidebar({ collapsed: true, hidden: false }));
      } else {
        dispatch(setSidebar({ collapsed: true, hidden: true }));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <main className="flex min-h-screen">
      {!isHidden && <Sidebar isCollapsed={isCollapsed} />}
      <div
        className={`${
          isCollapsed
            ? language === "en"
              ? "md:ml-[70px]"
              : "md:mr-[70px]"
            : language === "en"
            ? "md:ml-[250px]"
            : "md:mr-[250px]"
        } flex-1 transition-colors overflow-hidden`}
      >
        <div className="overflow-y-scroll sm:overflow-hidden mt-[70px]">
          {children}
        </div>
      </div>
    </main>
  );
};

export default RootLayout;
