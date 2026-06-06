import { Navigate, Route, Routes } from 'react-router-dom';
import { WalletOverviewPage } from '../../resources/pages/wallet/wallet-overview.page';
import { WalletPlaceholderPage } from '../../resources/pages/wallet/wallet-placeholder.page';

function WalletRouter() {
  return (
    <Routes>
      <Route index element={<Navigate replace to="overview" />} />
      <Route path="overview" element={<WalletOverviewPage />} />
      <Route
        path="balance"
        element={<WalletPlaceholderPage sectionId="balance" />}
      />
      <Route
        path="transfers"
        element={<WalletPlaceholderPage sectionId="transfers" />}
      />
      <Route path="*" element={<Navigate replace to="overview" />} />
    </Routes>
  );
}

export default WalletRouter;
