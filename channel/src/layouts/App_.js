import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Channel from "../pages/Channel";

const Workspace = lazy(() => import("./Workspace"));
const DirectMessage = lazy(() => import("../pages/DirectMessage"));
const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Workspace />}>
        <Route path="/channel/:id" element={<Channel />} />
        <Route path="/dm/:id" element={<DirectMessage />} />
      </Route>
    </Routes>
  </Suspense>
);

export default App;
