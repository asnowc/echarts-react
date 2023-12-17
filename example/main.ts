import reactDom from "react-dom/client";
import { createElement } from "react";
import { App } from "./pages/root.tsx";
const rooElement = document.getElementById("app")!;

reactDom.createRoot(rooElement).render(createElement(App));
