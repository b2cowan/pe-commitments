import React, { useState } from "react";
import WireProfile from "./WireProfile/WireProfile";
import PEEstimates from "./PEEstimates/PrivateEquityEstimates";
import PortfolioBuilder from "./PortfolioBuilder/PortfolioBuilder";
import TabGroup from "./HeaderButtons";

function App() {
  const [activePage, setActivePage] = useState("WireProfile");

  // const toggleComponent = (component) => {
  //   setDisplay(component);
  //   console.log(TabGroup.active);
  // };

  const renderPage = () => {
    switch (activePage) {
      case "WireProfile":
        return <WireProfile />;
      case "PEEstimates":
        return <PEEstimates />;
      case "PortfolioBuilder":
        return <PortfolioBuilder />;
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
export default App;
