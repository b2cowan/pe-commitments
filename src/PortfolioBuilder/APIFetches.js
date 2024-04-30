import { titleCase } from "title-case";
import { secTypeMapping, exchanges } from "./MappingData";
import axios from "axios";
import { detailsSeeds, stockSeeds } from "./seeds";

const findStockDetails = async (ticker, testing = true) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const numFormatter = new Intl.NumberFormat("en-US");

  let responseData;

  if (testing) {
    responseData = detailsSeeds;
  } else {
    const response = await axios.get(
      `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=11ZwEeQkm2TXgvb1S5DDIQs5FSN6l1Q5`
    );
    responseData = response.data.results;
  }
  responseData.sec_type = secTypeMapping.find(
    ({ code }) => code === responseData.type
  ).description;
  responseData.exchange_name = exchanges.find(
    ({ mic }) => mic === responseData.primary_exchange
  ).name;

  let fundamentals = [
    {
      col1: `Security Type: ${titleCase(responseData.sec_type)}`,
      col2: `Currency: ${responseData.currency_name.toUpperCase()}`,
    },
    {
      col1: `Classification: ${
        responseData.sic_description
          ? titleCase(responseData.sic_description.toLowerCase())
          : ""
      }`,
      col2: `Num. of Employees: ${
        responseData.total_employees
          ? numFormatter.format(responseData.total_employees)
          : ""
      }`,
    },
    {
      col1: `Shares Outstanding: ${
        responseData.weighted_shares_outstanding
          ? numFormatter.format(responseData.weighted_shares_outstanding)
          : ""
      }`,
      col2: `Num. of Employees: ${
        responseData.market_cap
          ? currencyFormatter.format(responseData.market_cap)
          : ""
      }`,
    },
    {
      col1: `Locale: ${
        responseData.locale ? responseData.locale.toUpperCase() : ""
      }`,
      col2: `Primary Exchange: ${
        responseData.exchange_name ? titleCase(responseData.exchange_name) : ""
      }`,
    },
  ];
  let finalResults = { results: responseData, columns: fundamentals };
  return finalResults;
};

const findStockList = async (search_text, testing = true) => {
  let responseData;
  if (testing) {
    responseData = stockSeeds;
  } else {
    const response = await axios.get(
      `https://n3jznxqyfg.execute-api.us-east-1.amazonaws.com/production/ticker-search?ticker=${search_text}`
      // `https://n3jznxqyfg.execute-api.us-east-1.amazonaws.com/production/ticker-search?ticker=${search_text}`
    );
    responseData = response.data.results;
  }
  let newStockSeeds = [];
  for (let i = 0, l = responseData.length; i < l; i++) {
    newStockSeeds.push({
      name: responseData[i]["name"],
      ticker: responseData[i]["ticker"],
      market: responseData[i]["market"],
    });
  }
  // setstockSearchList(newStockSeeds);
  return newStockSeeds;
};

export { findStockDetails, findStockList };
