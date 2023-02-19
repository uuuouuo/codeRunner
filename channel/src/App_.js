import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Channel from "./pages/Channel";

const Workspace = lazy(() => import("./layouts/Workspace"));
const DirectMessage = lazy(() => import("./pages/DirectMessage"));
const LogIn = lazy(() => import("./pages/Login"));
const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/workspace" element={<Workspace />}>
        <Route path="/workspace/channel/:id" element={<Channel />} />
        <Route path="/workspace/dm/:id" element={<DirectMessage />} />
      </Route>
    </Routes>
  </Suspense>
);

export default App;
