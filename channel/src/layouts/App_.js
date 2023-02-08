import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Channel from "../pages/Channel";
const Workspace = lazy(() => import("./Workspace"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Workspace />} />
      <Route path="/channel/:id" element={<Channel />} />
    </Routes>
  </Suspense>
);

export default App;
