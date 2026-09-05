import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import LoginPage from "@/pages/login"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <LoginPage />
  </DirectionProvider>
)
