import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import TermsPage from "@/pages/terms"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <TermsPage />
  </DirectionProvider>
)
