import { ChevronLeft, Folder, Maximize, Printer } from "lucide-react";
import PagesSearchBar from "../../components/ui/PagesSearchBar";
import useTranslation from "../../hooks/useTranslation";

const AccountTree = () => {
  const { t, language } = useTranslation();
  const files = [
    { id: 1, title: t("accountTree.genetics") },
    { id: 2, title: t("accountTree.adversaries") },
    { id: 3, title: t("accountTree.expenses") },
    { id: 4, title: t("accountTree.revenues") },
    { id: 5, title: t("accountTree.trading") },
  ];

  return (
    <div className="bg-(--bg-secondary) w-full md:w-2/3 lg:w-1/3 rounded-md shadow">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="p-4 flex sm:items-center sm:justify-between flex-col sm:flex-row gap-4">
          <PagesSearchBar width={"w-[250px] sm:w-[180px]"} />
          <div className="w-fit flex items-center gap-1 py-2 px-4 bg-[#daf4f0] hover:bg-[#0ab9bf] hover:text-white dark:bg-[#1d3a3a] text-[#0ab39c] rounded-sm duration-200 transition-colors cursor-pointer">
            <Printer size={16} />
            <span className="text-sm">{t("accountTree.buttons.print")}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 text-xs py-1 px-2 bg-[#405189] text-white w-fit rounded-sm">
          <Maximize size={12} />
          <p>{t("accountTree.buttons.expandCollapse")}</p>
        </div>
        <div
          className={`${
            language === "en"
              ? "border-l border-gray-300 border-dashed pl-4"
              : "border-r border-gray-300 border-dashed pr-4"
          } flex flex-col items-start gap-2.5 mt-4`}
        >
          {files.map((file) => {
            return (
              <button
                key={file.id}
                className="flex items-center gap-2 hover:bg-sky-100 w-full cursor-pointer rounded-sm px-0.5 py-0.5 duration-200 transition-colors"
              >
                <ChevronLeft size={18} className="text-[#2b4183]" />
                <Folder size={16} className="text-[#0d6efd]" />
                <span className="text-[15px] text-[#2a2e32] dark:text-[#ced4da]">
                  {file.id}
                  {"  "}
                  {file.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccountTree;
