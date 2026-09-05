import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import TradingPage from "@/pages/trading"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <TradingPage />
  </DirectionProvider>
)
