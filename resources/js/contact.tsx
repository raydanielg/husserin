import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import ContactPage from "@/pages/contact"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <ContactPage />
  </DirectionProvider>
)
