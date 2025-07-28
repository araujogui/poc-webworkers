import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import { MainThreadUpload } from "./MainThreadUpload.tsx";
import { WebWorkerUpload } from "./WebWorkerUpload.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainThreadUpload />} />
        <Route path="/worker" element={<WebWorkerUpload />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
