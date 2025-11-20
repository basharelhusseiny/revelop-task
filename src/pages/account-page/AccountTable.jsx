import { useState, useRef, useEffect } from "react";
import PagesSearchBar from "../../components/ui/PagesSearchBar";
import AccountPagination from "./AccountPagination";
import { getAccounts } from "../../store/accounts/thunk";
import { useDispatch } from "react-redux";
import useTranslation from "../../hooks/useTranslation";
import { Edit, Trash2 } from "lucide-react";

const AccountTable = ({ accounts }) => {
  const dispatch = useDispatch();
  const { t, language } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown].contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handlePageChange = (page) => {
    dispatch(getAccounts({ page }));
  };

  const handlePerPageChange = (perPage) => {
    dispatch(getAccounts({ perPage }));
  };

  const handleEdit = (accountId) => {
    console.log("Edit account:", accountId);
    setOpenDropdown(null);
  };

  const handleDelete = (accountId) => {
    console.log("Delete account:", accountId);
    setOpenDropdown(null);
  };

  return (
    <div className="bg-(--bg-secondary) w-full lg:w-2/3 rounded-md shadow">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <PagesSearchBar width={"w-[265px]"} />
        </div>
      </div>
      {/* Table */}
      <div className="p-4">
        <div className="w-full overflow-x-auto bg-(--bg-secondary) shadow">
          <table className="min-w-[580px] w-full">
            <thead>
              <tr className="bg-[#f3f6f9] dark:bg-[#282b2e] border-b border-gray-200 dark:border-gray-700">
                <th className="p-3 text-start text-[13px] font-semibold dark:text-white text-black">
                  {t("accountTable.accountID")}
                </th>
                <th className="p-3 text-start text-[13px] font-semibold dark:text-white text-black">
                  {t("accountTable.accountName")}
                </th>
                <th className="p-3 text-start text-[13px] font-semibold dark:text-white text-black">
                  {t("accountTable.mainAccount")}
                </th>
                <th className="p-3 text-start text-[13px] font-semibold dark:text-white text-black">
                  {t("accountTable.status")}
                </th>
                <th className="p-3 text-start text-[13px] font-semibold dark:text-white text-black">
                  {t("accountTable.manage")}
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts?.data?.map((account) => {
                return (
                  <tr
                    key={account.id}
                    className={`border-b border-gray-200 dark:border-gray-700  transition-colors`}
                  >
                    <td className="px-4 py-2 font-semibold text-sm text-(--text-base)">
                      {account.id}
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-(--text-base)">
                      {language === "en" ? account.name.en : account.name.ar}
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-(--text-base)">
                      {account.main_account
                        ? language === "en"
                          ? account.main_account.name.en
                          : account.main_account.name.ar
                        : "-"}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-1.5 rounded-sm h-4 text-[10px] font-medium ${
                          account.is_active
                            ? "bg-[#daf4f0] dark:bg-[#1d3a3a] text-[#0ab39c]"
                            : "bg-[#fde8e4] dark:bg-[#402e2e] text-[#f06561]"
                        }`}
                      >
                        {account.is_active
                          ? t("accountTable.active")
                          : t("accountTable.inactive")}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div
                        className="relative"
                        ref={(el) => (dropdownRefs.current[account.id] = el)}
                      >
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === account.id ? null : account.id
                            )
                          }
                          className="w-7 h-7 flex items-center pb-2 justify-center bg-[#e1ebfd] dark:bg-[#243147] text-[#3577f1] hover:text-white hover:bg-[#3577f1] focus:outline-none rounded-sm text-center leading-none cursor-pointer duration-200 transition-colors"
                        >
                          <span>...</span>
                        </button>

                        {openDropdown === account.id && (
                          <div
                            className={`${
                              language === "en" ? "right-16" : "left-11"
                            } absolute mt-1 w-34 bg-white dark:bg-[#2a2d31] rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50`}
                          >
                            <ul className="py-1">
                              <li>
                                <button
                                  onClick={() => handleEdit(account.id)}
                                  className="w-full flex items-center gap-2 px-4 py-1.5 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#343a40] transition-colors"
                                >
                                  <Edit className="w-3 h-3" />
                                  {t("accountTable.edit")}
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => handleDelete(account.id)}
                                  className="w-full flex items-center gap-2 px-4 py-1.5 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#343a40] transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  {t("accountTable.delete")}
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AccountPagination
        currentPage={accounts?.current_page || 1}
        last_page={accounts?.last_page}
        onPageChange={handlePageChange}
        per_page={accounts?.per_page}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

export default AccountTable;
