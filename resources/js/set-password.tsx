import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import SetPasswordPage from "@/pages/set-password"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <SetPasswordPage />
  </DirectionProvider>
)
