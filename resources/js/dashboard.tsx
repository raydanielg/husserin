import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import DashboardPage from "@/pages/dashboard"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <DashboardPage />
  </DirectionProvider>
)
