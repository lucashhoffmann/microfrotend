import { Navigate, Route, Routes } from 'react-router-dom';
import { AnalyticsOverviewPage } from '../../resources/pages/analytics/analytics-overview.page';
import { AnalyticsPlaceholderPage } from '../../resources/pages/analytics/analytics-placeholder.page';

function AnalyticsRouter() {
  return (
    <Routes>
      <Route index element={<Navigate replace to="overview" />} />
      <Route path="overview" element={<AnalyticsOverviewPage />} />
      <Route
        path="reports"
        element={<AnalyticsPlaceholderPage sectionId="reports" />}
      />
      <Route
        path="insights"
        element={<AnalyticsPlaceholderPage sectionId="insights" />}
      />
      <Route path="*" element={<Navigate replace to="overview" />} />
    </Routes>
  );
}

export default AnalyticsRouter;
