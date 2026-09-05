import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import SignupPage from "@/pages/signup"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider dir="ltr">
    <SignupPage />
  </DirectionProvider>
)
