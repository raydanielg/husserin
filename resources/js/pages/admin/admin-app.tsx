import { Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "@/components/admin-layout"
import DashboardOverview from "./dashboard-overview"
import DashboardAnalytics from "./dashboard-analytics"
import EnquiriesList from "./enquiries-list"
import EnquiryDetail from "./enquiry-detail"
import VendorsPage from "./vendors-page"
import TradingOverview from "./trading-overview"
import TradingOrders from "./trading-orders"
import TradingSuppliers from "./trading-suppliers"
import TendersActive from "./tenders-active"
import TenderProcurement from "./tender-procurement"
import TenderCompliance from "./tender-compliance"
import ConsolidationShipments from "./consolidation-shipments"
import ConsolidationOrders from "./consolidation-orders"
import SettingsGeneral from "./settings-general"
import SettingsTeam from "./settings-team"
import SettingsBilling from "./settings-billing"
import IndustriesOverview from "./industries-overview"
import IndustryDetail from "./industry-detail"

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
        <Route path="/admin/trading/orders" element={<TradingOrders />} />
        <Route path="/admin/trading/suppliers" element={<TradingSuppliers />} />

        {/* Tender & Procurement */}
        <Route path="/admin/tenders" element={<TendersActive />} />
        <Route path="/admin/tenders/procurement" element={<TenderProcurement />} />
        <Route path="/admin/tenders/compliance" element={<TenderCompliance />} />

        {/* Cargo Consolidation */}
        <Route path="/admin/consolidation" element={<ConsolidationShipments />} />
        <Route path="/admin/consolidation/orders" element={<ConsolidationOrders />} />

        {/* Vendors */}
        <Route path="/admin/vendors" element={<VendorsPage />} />
        <Route path="/admin/vendors/pending" element={<VendorsPage fixedStatus="pending" />} />
        <Route path="/admin/vendors/approved" element={<VendorsPage fixedStatus="approved" />} />

        {/* Settings */}
        <Route path="/admin/settings" element={<SettingsGeneral />} />
        <Route path="/admin/settings/team" element={<SettingsTeam />} />
        <Route path="/admin/settings/billing" element={<SettingsBilling />} />

        {/* Industries */}
        <Route path="/admin/industries" element={<IndustriesOverview />} />
        <Route path="/admin/industries/government" element={<IndustryDetail industry="government" />} />
        <Route path="/admin/industries/construction" element={<IndustryDetail industry="construction" />} />
        <Route path="/admin/industries/aviation" element={<IndustryDetail industry="aviation" />} />
        <Route path="/admin/industries/energy" element={<IndustryDetail industry="energy" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  )
}
