import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import TrackingPage from "@/pages/track"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <TrackingPage />
  </DirectionProvider>
)
