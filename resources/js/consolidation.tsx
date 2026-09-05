import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import ConsolidationPage from "@/pages/consolidation"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider dir="ltr">
    <ConsolidationPage />
  </DirectionProvider>
)
