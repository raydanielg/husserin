import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import TenderPage from "@/pages/tender"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider dir="ltr">
    <TenderPage />
  </DirectionProvider>
)
