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
  const [tranEntryIsOpen, setTranEntryIsOpen] = useState(false);
  const [fundamentalsIsOpen, setFundamentalsIsOpen] = useState(false);
  const [transactionList, setTransactionList] = useState([]);

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
          // console.log(props.api.getSelectedRows());
          setTickerSelect(ticker);
          setStockListIsOpen(false);
          setTranEntryIsOpen(true);
        }}
      >
        Select
      </Button>
    );
  };

  const TransactionEntryButton = (props) => {
    return (
      <Button
        onClick={async (e) => {
          e.preventDefault();
          const tran = props.api.getSelectedRows()[0];
          setTransactionList((origList) => [...origList, tran]);
          setTickerSelect();
          setTranEntryIsOpen(false);
        }}
      >
        Set Transaction
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

  const [transactionCols] = useState([
    {
      field: "ticker",
      flex: 1,
    },
    {
      field: "date",
      cellEditor: "agDateStringCellEditor",
      editable: true,
      flex: 1,
    },
    {
      field: "tranType",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Buy", "Sell"],
        filterList: true,
        searchType: "match",
        allowTyping: true,
        valueListMaxHeight: 220,
      },
      editable: true,
      flex: 1,
    },
    {
      field: "numShares",
      cellEditor: "agNumberCellEditor",
      editable: true,
      flex: 1,
    },
    {
      field: "price",
      cellEditor: "agNumberCellEditor",
      editable: true,
      flex: 1,
    },

    { field: "", flex: 1.25, cellRenderer: TransactionEntryButton },
  ]);

  const [transactionListCols] = useState([
    {
      field: "ticker",
      flex: 1,
    },
    {
      field: "date",
      flex: 1,
    },
    {
      field: "tranType",
      flex: 1,
    },
    {
      field: "numShares",

      flex: 1,
    },
    {
      field: "price",
      flex: 1,
    },
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
    await e.target.reset();

    setstockSearchList(stockListResults);
  };

  return (
    <>
      <div>
        <form method="post" onSubmit={handleTickerSubmit}>
          <label>
            Enter Ticker:
            <input name="tickerInput" id="tickerInput" />
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
        {/* <h1>
          {tickerSelect !== undefined ? `you selected: ${tickerSelect}` : ""}
        </h1> */}
        <ReactModal
          ariaHideApp={false}
          isOpen={tranEntryIsOpen}
          contentLabel="Transaction Entry Modal"
          onRequestClose={() => setTranEntryIsOpen(false)}
          className="Modal"
          overlayClassName="Overlay"
          backdropOpacity={1}
        >
          <h2>Enter Transaction Details</h2>
          <div className="ag-theme-quartz" style={{ height: 300, width: 800 }}>
            <AgGridReact
              rowData={[
                {
                  ticker: tickerSelect,
                  tranType: "Buy",
                  numShares: 1,
                  price: 100,
                  date: "2010-01-01",
                },
              ]}
              columnDefs={transactionCols}
              rowSelection="single"
              // headerHeight={0}
              suppressRowHoverHighlight={true}
              rowHeight={27}
            />
          </div>
        </ReactModal>
        {transactionList[0] !== undefined &&
        tranEntryIsOpen === false &&
        stockListIsOpen === false &&
        fundamentalsIsOpen === false ? (
          <div className="ag-theme-quartz" style={{ height: 300, width: 800 }}>
            <AgGridReact
              rowData={transactionList}
              columnDefs={transactionListCols}
              rowSelection="single"
              // headerHeight={0}
              suppressRowHoverHighlight={true}
              rowHeight={27}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <p></p>
      <iframe
        width="960"
        height="500"
        src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/324168792528/dashboards/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7?directory_alias=fos-reporting-qs"
      ></iframe>
      <iframe
        width="960"
        height="500"
        src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/324168792528/dashboards/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7/sheets/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_9733dda9-d598-4210-baf2-e52e644c8bd9/visuals/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_9b8f468d-48fa-49d6-924e-acbf3efaea65?directory_alias=fos-reporting-qs"
      ></iframe>
    </>
  );
}

export default PortfolioContribution;
