import React, { useState } from "react";
import WireProfile from "../WireProfile/WireProfile";
import PEEstimates from "../PEEstimates/PrivateEquityEstimates";
import PortfolioBuilder from "../PortfolioBuilder/PortfolioBuilder";
import Dashboard from "../Dashboard/Dashboard";
import TabGroup from "../HeaderButtons";
import CreateGame from "../Pages/game/pages/CreateGame";

function Finance() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "WireProfile":
        return <WireProfile />;
      case "PEEstimates":
        return <PEEstimates />;
      case "Dashboard":
        return <Dashboard />;
      case "PortfolioBuilder":
        return <PortfolioBuilder />;
      case "Bowling":
        return <CreateGame />;
      default:
        return null;
    }
  };

  return (
    <div>
      <TabGroup activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
    </div>
  );
}
export default Finance;
