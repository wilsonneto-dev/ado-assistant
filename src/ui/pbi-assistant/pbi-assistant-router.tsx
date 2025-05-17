import { RouteObject } from "react-router-dom";
import Assistant from "./pages/assistant";

export default [
  {
    path: "/",
    element: <Assistant />
  },
  {
    path: "*",
    element: <Assistant />
  }
] as RouteObject[]

