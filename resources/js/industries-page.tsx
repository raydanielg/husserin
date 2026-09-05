import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import IndustriesPage from "@/pages/industries"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider dir="ltr">
    <IndustriesPage />
  </DirectionProvider>
)
