import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { DirectionProvider } from "@/components/ui/direction"
import AdminApp from "@/pages/admin/admin-app"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider dir="ltr">
    <BrowserRouter>
      <AdminApp />
    </BrowserRouter>
  </DirectionProvider>
)
