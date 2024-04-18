import React, { useState } from "react";

function WireProfile() {
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div>
      <h1>Form Submission</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input1">Input 1:</label>
          <input
            type="text"
            id="input1"
            name="input1"
            value={formData.input1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="input2">Input 2:</label>
          <input
            type="text"
            id="input2"
            name="input2"
            value={formData.input2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="input3">Input 3:</label>
          <input
            type="text"
            id="input3"
            name="input3"
            value={formData.input3}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="input4">Input 4:</label>
          <input
            type="text"
            id="input4"
            name="input4"
            value={formData.input4}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="input5">Input 5:</label>
          <input
            type="text"
            id="input5"
            name="input5"
            value={formData.input5}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="input6">Input 6:</label>
          <input
            type="text"
            id="input6"
            name="input6"
            value={formData.input6}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submittedData && (
        <div>
          <h2>Submitted Data:</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default WireProfile;
