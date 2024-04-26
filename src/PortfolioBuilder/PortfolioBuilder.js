import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";
import "../App.css";
import axios from "axios";
// import { stockSeeds } from "./seeds";

function PortfolioContribution() {
  const [stockSearchList, setstockSearchList] = useState([]);
  const [tickerSelect, setTickerSelect] = useState();

  const CustomButtonComponent = (props) => {
    const ticker = props.data.ticker;
    return (
      <button
        onClick={() => {
          setTickerSelect(ticker);
        }}
      >
        Select Ticker
      </button>
    );
  };

  const [colDefs] = useState([
    { field: "name", flex: 2 },
    { field: "ticker", flex: 1 },
    { field: "asset type", flex: 1 },
    { field: "button", flex: 1, cellRenderer: CustomButtonComponent },
  ]);

  const fetchAPI = async (search_text) => {
    const response = await axios.get(
      `https://n3jznxqyfg.execute-api.us-east-1.amazonaws.com/production/ticker-search?ticker=${search_text}`
    );
    const responseData = response["data"];
    // const responseData = stockSeeds;
    let newStockSeeds = [];
    for (let i = 0, l = responseData.length; i < l; i++) {
      newStockSeeds.push({
        name: responseData[i]["name"],
        ticker: responseData[i]["ticker"],
        "asset type": responseData[i]["assetType"],
      });
    }
    setstockSearchList(newStockSeeds);
  };

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    fetchAPI(formJson["tickerInput"]);
  }

  return (
    <>
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <label>
            Enter Ticker:
            <input name="tickerInput" />
          </label>
          <hr />
          <button type="submit">Search</button>
        </form>
        <div className="ag-theme-quartz" style={{ height: 500, width: 700 }}>
          <AgGridReact rowData={stockSearchList} columnDefs={colDefs} />
        </div>
        <h1>{tickerSelect}</h1>
      </div>
    </>
  );
}

export default PortfolioContribution;
