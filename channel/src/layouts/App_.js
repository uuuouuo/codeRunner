import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Workspace = lazy(() => import("./Workspace"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Workspace />} />
    </Routes>
  </Suspense>
);

export default App;
