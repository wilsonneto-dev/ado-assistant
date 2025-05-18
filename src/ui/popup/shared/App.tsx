import { ToastProvider } from "../toast/toast-provider.tsx"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import "../../i18n.ts"
import pbiAssistantRouter from "../pbi-assistant/pbi-assistant-router.tsx";

const router = createBrowserRouter([
  ...pbiAssistantRouter
]);

console.log(location.href)

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
