import { Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "@/components/admin-layout"
import DashboardOverview from "./dashboard-overview"
import DashboardAnalytics from "./dashboard-analytics"
import EnquiriesList from "./enquiries-list"
import EnquiryDetail from "./enquiry-detail"
import VendorsPage from "./vendors-page"
import TradingOverview from "./trading-overview"
import TendersActive from "./tenders-active"
import ConsolidationShipments from "./consolidation-shipments"
import SettingsGeneral from "./settings-general"
import SettingsTeam from "./settings-team"
import PlaceholderPage from "./placeholder"

export default function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Dashboard */}
        <Route path="/admin" element={<DashboardOverview />} />
        <Route path="/admin/analytics" element={<DashboardAnalytics />} />

        {/* Enquiries */}
        <Route path="/admin/enquiries" element={<EnquiriesList />} />
        <Route path="/admin/enquiries/vendors" element={<EnquiriesList fixedType="VENDOR" />} />
        <Route path="/admin/enquiries/rfqs" element={<EnquiriesList fixedType="RFQ" />} />
        <Route path="/admin/enquiries/contacts" element={<EnquiriesList fixedType="CONTACT" />} />
        <Route path="/admin/enquiries/:id" element={<EnquiryDetail />} />

        {/* Trading & Supply */}
        <Route path="/admin/trading" element={<TradingOverview />} />
        <Route path="/admin/trading/orders" element={<PlaceholderPage title="Orders" description="Track and manage trading orders" />} />
        <Route path="/admin/trading/suppliers" element={<PlaceholderPage title="Suppliers" description="Manage supplier relationships" />} />

        {/* Tender & Procurement */}
        <Route path="/admin/tenders" element={<TendersActive />} />
        <Route path="/admin/tenders/procurement" element={<PlaceholderPage title="Procurement" description="Manage procurement processes" />} />
        <Route path="/admin/tenders/compliance" element={<PlaceholderPage title="Compliance" description="Track compliance requirements" />} />

        {/* Cargo Consolidation */}
        <Route path="/admin/consolidation" element={<ConsolidationShipments />} />
        <Route path="/admin/consolidation/orders" element={<PlaceholderPage title="Consolidation Orders" description="Manage consolidation orders" />} />

        {/* Vendors */}
        <Route path="/admin/vendors" element={<VendorsPage />} />
        <Route path="/admin/vendors/pending" element={<VendorsPage fixedStatus="pending" />} />
        <Route path="/admin/vendors/approved" element={<VendorsPage fixedStatus="approved" />} />

        {/* Settings */}
        <Route path="/admin/settings" element={<SettingsGeneral />} />
        <Route path="/admin/settings/team" element={<SettingsTeam />} />
        <Route path="/admin/settings/billing" element={<PlaceholderPage title="Billing" description="Manage billing and subscriptions" />} />

        {/* Industries */}
        <Route path="/admin/industries" element={<PlaceholderPage title="All Industries" description="Manage industry sectors" />} />
        <Route path="/admin/industries/government" element={<PlaceholderPage title="Government & Institutions" description="Government sector enquiries" />} />
        <Route path="/admin/industries/construction" element={<PlaceholderPage title="Construction" description="Construction sector enquiries" />} />
        <Route path="/admin/industries/aviation" element={<PlaceholderPage title="Aviation" description="Aviation sector enquiries" />} />
        <Route path="/admin/industries/energy" element={<PlaceholderPage title="Energy" description="Energy sector enquiries" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  )
}
