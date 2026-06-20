import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Summary from "./pages/Summary";
import Settings from "./pages/Settings";
import "./styles/App.css";
import BottomNav from "./components/BottomNav";
function App() {
  return (
    <BrowserRouter>

  <Routes>

    <Route
      path="/"
      element={<Home />}
    />

    <Route
      path="/income"
      element={<Income />}
    />

    <Route
      path="/expenses"
      element={<Expenses />}
    />

    <Route
      path="/summary"
      element={<Summary />}
    />

    <Route
      path="/settings"
      element={<Settings />}
    />

  </Routes>

  <BottomNav />

</BrowserRouter>
  );
}

export default App;
