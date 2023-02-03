import React from "react";
import { Route, Routes } from "react-router-dom";
import Workspace from "./Workspace";
const App = () => (
  <Routes>
    <Route path="/" element={<Workspace />} />
  </Routes>
);

export default App;
