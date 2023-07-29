import React, { useState } from "react";

const TableWithInput = () => {
  const [column1Values, setColumn1Values] = useState(["1", "2", "3", "4", "5"]);
  const [column2Values, setColumn2Values] = useState(["a", "b", "c", "d", "e"]);

  const handleInputChange = (e, index, columnName) => {
    const { value } = e.target;
    if (columnName === "column1") {
      const updatedValues = [...column1Values];
      updatedValues[index] = value;
      setColumn1Values(updatedValues);
    } else if (columnName === "column2") {
      const updatedValues = [...column2Values];
      updatedValues[index] = value;
      setColumn2Values(updatedValues);
    }
  };

  const handleArrayLogging = () => {
    console.log("Column 1 Values:", column1Values);
    console.log("Column 2 Values:", column2Values);
  };

  return (
    <div>
      <h1>Table with Input Fields</h1>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tbody>
          {column1Values.map((value, index) => (
            <tr key={index + 1}>
              <td>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(e, index, "column1")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={column2Values[index]}
                  onChange={(e) => handleInputChange(e, index, "column2")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleArrayLogging}>Log Arrays</button>
    </div>
  );
};

export default TableWithInput;
