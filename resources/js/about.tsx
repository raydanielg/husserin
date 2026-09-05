import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import AboutPage from "@/pages/about"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <AboutPage />
  </DirectionProvider>
)
