import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VehicleCountList from "./components/VehicleCountList";
import AddVehicleCount from "./components/AddVehicleCount";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleCountList />} />
        <Route path="/add-vehicle" element={<AddVehicleCount />} />
      </Routes>
    </Router>
  );
};

export default App;
