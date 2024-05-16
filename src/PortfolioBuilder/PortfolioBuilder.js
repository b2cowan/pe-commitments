import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";
import ReactModal from "react-modal";
import "../App.css";
import "./styles.css";
import styled from "styled-components";
import { findStockDetails, findStockList } from "./APIFetches";

//  set variable for using testing data
const useSeeds = false;

const Button = styled.button`
  color: black;
  font-size: 12;
  margin: 0;
  border: 2px solid #1f5323;
  border-radius: 3px;
  &:hover {
    background: #9ee9a4;
  }
`;

function PortfolioContribution() {
  const [stockSearchList, setstockSearchList] = useState([]);
  const [fundamentalResults, setFundamentalResults] = useState({});
  const [stockFundamentals, setstockFundamentals] = useState([]);
  const [tickerSelect, setTickerSelect] = useState();
  const [stockListIsOpen, setStockListIsOpen] = useState(false);
  const [fundamentalsIsOpen, setFundamentalsIsOpen] = useState(false);

  const DetailsButton = (props) => {
    return (
      <Button
        onClick={async (e) => {
          e.preventDefault();
          const ticker = props.api.getSelectedRows()[0].ticker;
          const tickerResults = await findStockDetails(ticker, useSeeds);
          setstockFundamentals(tickerResults.columns);
          setFundamentalResults(tickerResults.results);
          setFundamentalsIsOpen(true);
        }}
      >
        Details
      </Button>
    );
  };

  const SelectButton = (props) => {
    return (
      <Button
        onClick={async (e) => {
          e.preventDefault();
          const ticker = props.api.getSelectedRows()[0].ticker;
          // console.log(ticker);
          setTickerSelect(ticker);
          setStockListIsOpen(false);
        }}
      >
        Select
      </Button>
    );
  };

  const [colDefs] = useState([
    {
      field: "name",
      flex: 2.5,
    },
    { field: "ticker", flex: 1 },
    { field: "securityType", flex: 1.5 },
    {
      field: "",
      flex: 0.85,
      cellRenderer: DetailsButton,
      justifyContent: "center",
      alignItems: "center",
    },
    { field: "", flex: 0.85, cellRenderer: SelectButton },
  ]);

  const [fundamentalColDefs] = useState([
    {
      field: "col1",
      flex: 1,
      resizable: true,
      sortable: true,
      wrapText: true,
      autoHeight: true,
      cellStyle: { wordBreak: "normal" },
    },
    {
      field: "col2",
      flex: 1,
      resizable: true,
      sortable: true,
      wrapText: true,
      autoHeight: true,
      cellStyle: { wordBreak: "normal" },
    },
  ]);

  const closeFundamentals = () => {
    setFundamentalsIsOpen(false);
    setStockListIsOpen(true);
  };

  const handleTickerSubmit = async (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const stockListResults = await findStockList(
      formJson["tickerInput"],
      useSeeds
    );

    setstockSearchList(stockListResults);
  };

  return (
    <>
      <div>
        <form method="post" onSubmit={handleTickerSubmit}>
          <label>
            Enter Ticker:
            <input name="tickerInput" />
          </label>
          <hr />
          <button type="submit" onClick={() => setStockListIsOpen(true)}>
            Search
          </button>
        </form>
        <ReactModal
          ariaHideApp={false}
          isOpen={stockListIsOpen}
          contentLabel="Stock List Modal"
          onRequestClose={() => setStockListIsOpen(false)}
          className="Modal"
          overlayClassName="Overlay"
          backdropOpacity={1}
        >
          <div className="ag-theme-quartz" style={{ height: 500, width: 700 }}>
            <AgGridReact
              rowData={stockSearchList}
              columnDefs={colDefs}
              rowSelection="single"
              // onSelectionChanged={onSelectionChanged}
              // rowStyle={{ background: "#ff7979" }}
            />
          </div>
        </ReactModal>
        <ReactModal
          ariaHideApp={false}
          isOpen={fundamentalsIsOpen}
          contentLabel="Fundamentals Modal"
          onRequestClose={closeFundamentals}
          className="Modal"
          overlayClassName="Overlay"
          backdropOpacity={1}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 height="50" style={{ flex: "9", textAlign: "center" }}>
                {`${fundamentalResults.name} (${fundamentalResults.ticker})`}
              </h1>
            </div>
            <p style={{ fontSize: 14 }}>{fundamentalResults.description}</p>
            <div
              className="ag-theme-quartz"
              style={{ height: 300, width: 700 }}
            >
              <AgGridReact
                rowData={stockFundamentals}
                columnDefs={fundamentalColDefs}
                headerHeight={0}
                suppressRowHoverHighlight={true}
                rowHeight={27}
              />
            </div>
          </div>
        </ReactModal>
        <h1>
          {tickerSelect !== undefined ? `you selected: ${tickerSelect}` : ""}
        </h1>
      </div>
    </>
  );
}

export default PortfolioContribution;
