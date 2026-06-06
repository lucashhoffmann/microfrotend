import { Navigate, Route, Routes } from 'react-router-dom';
import { BillingOverviewPage } from '../../resources/pages/billing/billing-overview.page';
import { BillingPlaceholderPage } from '../../resources/pages/billing/billing-placeholder.page';

function BillingRouter() {
  return (
    <Routes>
      <Route index element={<Navigate replace to="overview" />} />
      <Route path="overview" element={<BillingOverviewPage />} />
      <Route
        path="charges"
        element={<BillingPlaceholderPage sectionId="charges" />}
      />
      <Route path="plans" element={<BillingPlaceholderPage sectionId="plans" />} />
      <Route path="*" element={<Navigate replace to="overview" />} />
    </Routes>
  );
}

export default BillingRouter;
