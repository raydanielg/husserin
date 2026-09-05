import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import LandingPage from "@/pages/landing"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <LandingPage />
  </DirectionProvider>
)
