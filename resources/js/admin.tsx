import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { DirectionProvider } from "@/components/ui/direction"
import { ThemeProvider } from "@/components/theme-provider"
import AdminApp from "@/pages/admin/admin-app"

createRoot(document.getElementById("app")!).render(
  <DirectionProvider direction="ltr">
    <ThemeProvider>
      <BrowserRouter>
        <AdminApp />
      </BrowserRouter>
    </ThemeProvider>
  </DirectionProvider>
)
