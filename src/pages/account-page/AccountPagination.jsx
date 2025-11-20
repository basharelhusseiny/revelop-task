import useTranslation from "../../hooks/useTranslation";

const AccountPagination = ({
  currentPage,
  last_page,
  onPageChange,
  onPerPageChange,
  per_page,
}) => {
  const { t, language } = useTranslation();
  if (!currentPage || !last_page) {
    return null;
  }

  const generatePageNumbers = () => {
    const pages = [];
    const delta = 2;

    if (last_page <= 7) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);
    let start = Math.max(2, currentPage - delta);
    let end = Math.min(last_page - 1, currentPage + delta);
    if (currentPage <= 4) {
      start = 2;
      end = 5;
    } else if (currentPage >= last_page - 3) {
      start = last_page - 4;
      end = last_page - 1;
    }
    if (start > 2) {
      pages.push("...");
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < last_page - 1) {
      pages.push("...");
    }
    pages.push(last_page);
    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-between bg-(--bg-secondary) overflow-x-scroll px-4 py-3 hide-scroll-bar">
      <div className="flex items-center gap-2">
        {/* Previous  */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 h-[33px] cursor-pointer text-[13px] font-medium rounded-md transition-colors ${
            currentPage === 1
              ? "hidden"
              : "block text-[#3e4e89] hover:text-[#636e97] border border-gray-200 dark:border-gray-700"
          }`}
        >
          {t("accountTable.previous")}
        </button>

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-1 text-sm text-[#3e4e89] dark:text-white hover:text-[#636e97] border h-[33px] border-gray-200 dark:border-gray-700 rounded-md"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={page === currentPage}
              className={`min-w-[30px] h-[33px] px-3 py-1 cursor-pointer text-[13px] font-medium rounded-md transition-colors ${
                page === currentPage
                  ? "bg-[#3e4e89] text-white cursor-default"
                  : "text-[#3e4e89] dark:text-white border border-gray-200 dark:border-gray-700"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === last_page}
          className={`px-3 py-1 h-[33px] text-[13px] cursor-pointer font-medium rounded-md transition-colors ${
            currentPage === last_page
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "text-[#3e4e89] hover:text-[#636e97] border border-gray-200 dark:border-gray-700"
          }`}
        >
          {t("accountTable.next")}
        </button>
      </div>

      {/* Rows */}
      <select
        value={per_page || 10}
        onChange={(e) => onPerPageChange(parseInt(e.target.value))}
        className="appearance-none w-[110px] h-[33px] mx-5 px-3 py-2 text-center text-sm border border-gray-300 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#282b2e] text-(--text-base)"
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={150}>150</option>
        <option value={200}>200</option>
      </select>
    </div>
  );
};

export default AccountPagination;
