import React from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./components/app-layout";

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<AppLayout />);
