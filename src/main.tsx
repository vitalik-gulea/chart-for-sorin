import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";



createRoot(document.getElementById("root")!).render(
    <NextUIProvider>
      <App/>
    </NextUIProvider>
);
