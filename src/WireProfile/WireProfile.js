import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    ItemID: 12345,
    ProfileName: "",
    BankAccountNumber: "",
    BankAccountName: "",
    ABA: "",
    SWIFT: "",
    LocalBankIdentifier: "",
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
      <h1>Wire Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ProfileName">Profile Name:</label>
          <input
            type="text"
            id="ProfileName"
            name="ProfileName"
            value={formData.ProfileName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="BankAccountNumber">Bank Account Number:</label>
          <input
            type="text"
            id="BankAccountNumber"
            name="BankAccountNumber"
            value={formData.BankAccountNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="BankAccountName">Bank Account Name:</label>
          <input
            type="text"
            id="BankAccountName"
            name="BankAccountName"
            value={formData.BankAccountName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="ABA">ABA:</label>
          <input
            type="text"
            id="ABA"
            name="ABA"
            value={formData.ABA}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="SWIFT">SWIFT:</label>
          <input
            type="text"
            id="SWIFT"
            name="SWIFT"
            value={formData.SWIFT}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="LocalBankIdentifier">LocalBankIdentifier:</label>
          <input
            type="text"
            id="LocalBankIdentifier"
            name="LocalBankIdentifier"
            value={formData.LocalBankIdentifier}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submittedData && (
        <div>
          <h2>Submitted Data:</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          <p>
            This is what is submitted to the API for creating a profile or
            updating a profile. Obviously make it in NT format, but that should
            be super easy as I'm sure every page is templated. Functionally this
            is pretty much it, or am I missing something?
          </p>
          <p>There's even required fields in the form! :)</p>
        </div>
      )}
    </div>
  );
}

export default App;
