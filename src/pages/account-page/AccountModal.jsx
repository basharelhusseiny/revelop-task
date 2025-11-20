import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modalsSlice";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";
import { createAccount, getAccounts } from "../../store/accounts/thunk";

const AccountModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.modals);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const [formData, setFormData] = useState({
    accountId: "6",
    accountName: "",
    accountNameLatin: "",
    isSubAccount: false,
    mainAccount: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Sending Form Data:", formData);

    try {
      await dispatch(createAccount(formData)).unwrap();
      dispatch(getAccounts({ page: 1, perPage: 10 }));
      dispatch(closeModal());
      setFormData({
        accountId: "6",
        accountName: "",
        accountNameLatin: "",
        isSubAccount: false,
        mainAccount: "",
        isActive: true,
      });
    } catch (error) {
      console.error("Failed to create account:", error);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!isModalOpen) return null;

  return (
    <div
      onClick={() => dispatch(closeModal())}
      className="fixed w-full inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#212529] max-w-[500px] h-[560px] rounded-md shadow-xl w-full"
      >
        {/* Header */}
        <div className="flex w-full h-[55px] items-center justify-between bg-[#dff0fa] dark:bg-[#223644] p-4 rounded-sm">
          <h2 className="font-semibold text-[#495057] dark:text-[#ced4da]">
            {t("addAccount.title")}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-300 hover:text-gray-500 duration-200 cursor-pointer transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-3">
          {/* Account ID */}
          <div>
            <label className="block text-[13px] font-medium text-[#495057] dark:text-[#ced4da] mb-2">
              {t("addAccount.fields.accountId")}
            </label>
            <input
              type="text"
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              className="w-full px-4 py-1.5 bg-white dark:bg-[#2a2d31] border border-gray-300 dark:border-gray-800 rounded-md text-[#495057] dark:text-[#ced4da] focus:outline-0"
            />
          </div>

          {/* Account Name */}
          <div>
            <label className="block text-[13px] font-medium text-[#495057] dark:text-[#ced4da] mb-2">
              {t("addAccount.fields.accountName")}
            </label>
            <input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              className="w-full px-4 py-1.5 bg-white dark:bg-[#2a2d31] border border-gray-300 dark:border-gray-800 rounded-md text-[#495057] dark:text-[#ced4da] focus:outline-gray-300 dark:focus:outline-0"
            />
          </div>

          {/* Account Name in Latin */}
          <div>
            <label className="block text-[13px] font-medium text-[#495057] dark:text-[#ced4da] mb-2">
              {t("addAccount.fields.accountNameLatin")}
            </label>
            <input
              type="text"
              name="accountNameLatin"
              value={formData.accountNameLatin}
              onChange={handleChange}
              className="w-full px-4 py-1.5 bg-white dark:bg-[#2a2d31] border border-gray-300 dark:border-gray-800 rounded-md text-[#495057] dark:text-[#ced4da] focus:outline-gray-300 dark:focus:outline-0"
            />
          </div>

          {/* Sub Account Toggle */}
          <div className="flex items-center gap-3 mb-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isSubAccount"
                checked={formData.isSubAccount}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-[26px] h-3.5 bg-white dark:bg-[#262a2f] rounded-full peer peer-checked:bg-sky-500 border-gray-300 dark:border-gray-700 transition-colors">
                <div className="absolute top-0.5 left-0.5 bg-[#bdbfc7] dark:bg-[#5c5f63] peer-checked:bg-white w-2.5 h-2.5 rounded-full transition-transform peer-checked:translate-x-5"></div>
              </div>
            </label>
            <span className="text-[13px] font-medium text-[#495057] dark:text-[#ced4da]">
              {t("addAccount.fields.subAccount")}{" "}
              <span className="text-gray-400">
                {t("addAccount.fields.hasNoSub")}
              </span>
            </span>
          </div>

          {/* Main Account */}
          <div>
            <label className="block text-[13px] font-medium text-[#495057] dark:text-[#ced4da] mb-2">
              {t("addAccount.fields.mainAccount")}
            </label>
            <input
              type="text"
              name="mainAccount"
              value={formData.mainAccount}
              onChange={handleChange}
              className="w-full px-4 py-1.5 bg-white dark:bg-[#2a2d31] border border-gray-300 dark:border-gray-800 rounded-md text-[#495057] dark:text-[#ced4da] focus:outline-gray-300 dark:focus:outline-0"
            />
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              id="isActive"
              onChange={handleChange}
              className="w-4 h-4 text-teal-500 border-gray-300 rounded accent-[#405189]"
            />
            <label
              htmlFor="isActive"
              className="text-[13px] font-medium text-[#495057] dark:text-[#ced4da]"
            >
              {t("addAccount.fields.active")}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-1.5 text-[13px] text-[#495057] dark:text-[#ced4da] bg-[#f3f6f9] dark:bg-[#282b2e] hover:bg-gray-200 rounded-md font-medium transition-colors"
            >
              {t("addAccount.buttons.close")}
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-1.5 text-[13px] text-white bg-[#0ab39c] hover:bg-teal-600 rounded-md font-medium transition-colors"
            >
              {t("addAccount.buttons.create")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
