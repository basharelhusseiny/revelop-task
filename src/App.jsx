import Navbar from "./layouts/navbar/Navbar";
import RootLayout from "./layouts/RootLayout";
import AccountsPage from "./pages/account-page/AccountsPage";

const App = () => {
  return (
    <RootLayout>
      <Navbar />
      <AccountsPage />
    </RootLayout>
  );
};

export default App;
