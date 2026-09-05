import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import RfqPage from "@/pages/rfq"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <RfqPage />
  </DirectionProvider>
)
