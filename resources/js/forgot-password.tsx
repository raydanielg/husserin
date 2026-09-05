import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import ForgotPasswordPage from "@/pages/forgot-password"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <ForgotPasswordPage />
  </DirectionProvider>
)
