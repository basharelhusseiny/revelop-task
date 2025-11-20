import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/ui/PageHeader";
import AccountTable from "./AccountTable";
import AccountTree from "./AccountTree";
import AddAccount from "./AddAccount";
import { getAccounts } from "../../store/accounts/thunk";
import { useEffect } from "react";
import AccountModal from "./AccountModal";

const AccountsPage = () => {
  const dispatch = useDispatch();
  const { accounts, isLoading } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);
  console.log(accounts)
  return (
    <div>
      <PageHeader />
      <div className="p-6">
        <AddAccount />
        <div className="py-6 flex flex-col items-start lg:flex-row gap-6">
          <AccountTree />
          <AccountTable accounts={accounts} />
        </div>
      </div>
      <AccountModal />
    </div>
  );
};

export default AccountsPage;
