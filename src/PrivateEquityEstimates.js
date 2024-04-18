import ReactModal from "react-modal";
import React, { useState } from "react";
import Select from "react-select";
import "./App.css";
import Writeup from "./Writeup.js";
import { findCommitments } from "./pe-commitment-estimates.js";
import {
  bOCapitalRates,
  bODistRates,
  bOPostDistRates,
  bOCapital,
  years2,
} from "./starters.js";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function PEEstimates() {
  const [testInfo, setTestInfo] = useState({
    gr: 0.025,
    capitalRates: bOCapital,
    cumulativeCapital: bOCapitalRates,
    n: 5,
    newPEWeight: 0.13,
    currentMV: 10000000,
    currentPE: 1000000,
    PEMVAfterGrowth: "",
    TotMVAfterGrowth: "",
    ReqFunds: "",
    AnnualCommitment: "",
    results: {},
    isBuyOut: true,
  });

  const [capitalRates, setCapitalRates] = useState(bOCapital);
  const [distRates, setDistRates] = useState(bODistRates);
  const [startDate, setStartDate] = useState(years2[0].value);
  const [endDate, setEndDate] = useState(years2[4].value);
  const [isOpen, setIsOpen] = useState(false);
  const [docIsOpen, setDocIsOpen] = useState(false);
  const [postDistRates, setPostDistRates] = useState(bOPostDistRates);
  const [cumCapital, setCumCapital] = useState(bOCapitalRates);

  const handleChange = (event) => {
    setTestInfo({ ...testInfo, [event.target.name]: event.target.value });
  };

  const handleStartDate = (e) => {
    let newN = endDate - e.value + 1;
    setStartDate(e.value);
    setTestInfo({ ...testInfo, n: newN });
    console.log("StartDate: ", startDate);
    console.log("EndDate: ", endDate);
    console.log(newN);
  };

  const handleEndDate = (e) => {
    let newN = e.value - startDate + 1;
    setEndDate(e.value);
    setTestInfo({ ...testInfo, n: newN });
    console.log("StartDdoate: ", startDate);
    console.log("EndDate: ", endDate);
    console.log(newN);
  };

  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    let res = findCommitments(
      cumCapital,
      postDistRates,
      Number(testInfo.gr),
      Number(testInfo.n)
    );

    setTestInfo({
      ...testInfo,
      PEMVAfterGrowth:
        Number(testInfo.currentPE) *
        (1 + Number(testInfo.gr)) ** Number(testInfo.n),
      TotMVAfterGrowth:
        Number(testInfo.currentMV) *
        (1 + Number(testInfo.gr)) ** Number(testInfo.n),
      ReqFunds:
        (testInfo.currentPE * (1 + Number(testInfo.gr)) ** Number(testInfo.n) -
          testInfo.currentMV *
            (1 + Number(testInfo.gr)) ** Number(testInfo.n) *
            Number(testInfo.newPEWeight)) /
        (Number(testInfo.newPEWeight) - 1),
      AnnualCommitment:
        (Number(testInfo.currentPE) *
          (1 + Number(testInfo.gr)) ** Number(testInfo.n) -
          Number(testInfo.currentMV) *
            (1 + Number(testInfo.gr)) ** Number(testInfo.n) *
            Number(testInfo.newPEWeight)) /
        (Number(testInfo.newPEWeight) - 1) /
        Number(res.sumCapFactors),
      results: res,
    });
    // console.log(capitalRates);
  };

  const handleInputChange = (e, index, columnName) => {
    let value = e.target.value;
    if (columnName === "capitalRates") {
      let updatedValues = [...capitalRates];
      updatedValues[index] = Number(value);
      setCapitalRates(updatedValues);
      let updatedCumRates = [];
      let num = updatedValues.length;
      let multFactor = 1;
      while (num > 0) {
        let idx = updatedValues.length - num;
        let val = updatedValues[idx] * multFactor;
        let mfNew = 1 - updatedValues[idx];
        updatedCumRates.push(val);
        num -= 1;
        multFactor *= mfNew;
      }
      setCumCapital(updatedCumRates);
      // console.log(updatedCumRates);
    } else if (columnName === "distRates") {
      let updatedValues = [...distRates];
      updatedValues[index] = Number(value);
      setDistRates(updatedValues);
      let updatedPostDistRates = [];
      updatedValues.forEach((v) => {
        let r = 1 - v;
        updatedPostDistRates.push(r);
      });
      setPostDistRates(updatedPostDistRates);
    }
    // console.log("distRates: ", distRates);
    // console.log("postDistRates: ", postDistRates);
  };

  return (
    <div className="App">
      <h1>Private Equity Commitment Projections</h1>
      <div style={{ paddingLeft: "25px", paddingBottom: "10px" }}>
        <button onClick={() => setIsOpen(true)}>Set PE Model Details</button>
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
        className="Modal"
        overlayClassName="Overlay"
        backdropOpacity={1}
      >
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Capital Rates</th>
              <th>Distribution Rates</th>
            </tr>
          </thead>
          <tbody>
            {capitalRates.map((value, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="number"
                    step="0.0001"
                    value={capitalRates[index]}
                    onChange={(e) =>
                      handleInputChange(e, index, "capitalRates")
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.0001"
                    value={distRates[index]}
                    onChange={(e) => handleInputChange(e, index, "distRates")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ReactModal>
      <div style={{ float: "left", paddingLeft: "25px" }}>
        <form onSubmit={handleSubmit}>
          <label>
            Growth Rate:
            <input
              name="gr"
              type="text"
              value={testInfo.gr}
              onChange={handleChange}
            />
          </label>
          <p></p>
          <label>
            Start Year:
            <Select
              onChange={handleStartDate}
              autoFocus={true}
              options={years2}
              defaultValue={years2[0]}
            />
          </label>
          <br></br>
          <label>
            End Year:
            <Select
              onChange={handleEndDate}
              autoFocus={true}
              options={years2}
              defaultValue={years2[4]}
            />
          </label>
          <br></br>
          <label>
            New PE Weight:
            <input
              type="text"
              name="newPEWeight"
              value={testInfo.newPEWeight}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label>
            Current PE MV:
            <input
              type="text"
              name="currentPE"
              value={testInfo.currentPE}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label>
            Current Total MV:
            <input
              type="text"
              name="currentMV"
              value={testInfo.currentMV}
              onChange={handleChange}
            />
          </label>
          <div>
            <button>Calculate</button>
          </div>
          <p></p>
          <div>
            <text>
              PE MV After Growth: {formatter.format(testInfo.PEMVAfterGrowth)}
            </text>
          </div>
          <p></p>
          <div>
            <text>
              Total MV After Growth:{" "}
              {formatter.format(testInfo.TotMVAfterGrowth)}
            </text>
          </div>
          <p></p>
          <div>
            <text>
              Required Funds: <b>{formatter.format(testInfo.ReqFunds)}</b>
            </text>
          </div>
          {/* <p></p>
          <div>
            <text>Total Weight Factor: {testInfo.results.sumCapFactors}</text>
          </div> */}
          <p></p>
          <div>
            <h2>
              Required Commitments:{" "}
              {formatter.format(testInfo.AnnualCommitment)}
            </h2>
            {/* <br></br>
            <text>
              Required Commitments = (Required Funds / Total Weight Factor)
            </text> */}
          </div>
        </form>
        <div
          style={{
            // paddingLeft: "25px",
            paddingBottom: "10px",
          }}
        >
          <button onClick={() => setDocIsOpen(true)}>Writeup</button>
        </div>
        <ReactModal
          ariaHideApp={false}
          isOpen={docIsOpen}
          contentLabel="Writeup"
          onRequestClose={() => setDocIsOpen(false)}
          className="Writeup"
          overlayClassName="Overlay"
          backdropOpacity={1}
        >
          <Writeup />
        </ReactModal>
      </div>
    </div>
  );
}

export default PEEstimates;
