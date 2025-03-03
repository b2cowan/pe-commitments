import React from "react";
import styled from "styled-components";

const pages = [
  "WireProfile",
  "PEEstimates",
  "PortfolioBuilder",
  "Bowling",
  "Dashboard",
];

const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

function TabGroup({ activePage, setActivePage }) {
  const handleButtonClick = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <div>
        {pages.map((page) => (
          <Tab
            key={page}
            active={activePage === page}
            onClick={() => handleButtonClick(page)}
            disabled={activePage === page}
          >
            {page}
          </Tab>
        ))}
      </div>
    </>
  );
}
export default TabGroup;
