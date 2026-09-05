import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import PrivacyPage from "@/pages/privacy"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <PrivacyPage />
  </DirectionProvider>
)
