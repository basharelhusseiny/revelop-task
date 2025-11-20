import { useDispatch } from "react-redux";
import useTranslation from "../../hooks/useTranslation";
import { openModal } from "../../store/modalsSlice";
import { useEffect } from "react";

const AddAccount = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-(--bg-secondary) rounded-sm border-b border-gray-200 dark:border-gray-700 ">
      <button
        onClick={() => dispatch(openModal())}
        className="text-[13px] flex items-center gap-2 bg-[#299cdb] hover:bg-[#2486bb] text-white duration-300 transition-colors cursor-pointer py-[7px] px-[17px] rounded-sm"
      >
        <span>+</span>
        <span>{t("accounts.addAccount")}</span>
      </button>
    </div>
  );
};

export default AddAccount;
