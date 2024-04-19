import React, { useState } from "react";
import WireProfile from "./WireProfile";
import PEEstimates from "./PrivateEquityEstimates";
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
