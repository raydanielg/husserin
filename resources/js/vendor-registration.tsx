import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import VendorRegistrationPage from "@/pages/vendor-registration"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <VendorRegistrationPage />
  </DirectionProvider>
)
