// var newPrivateEquityWeight = 0.13;
var bOCapital = [
  0.25, 0.3, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35,
];

var bOCapitalRates = [
  0.25, 0.225, 0.1838, 0.1194, 0.0776, 0.0505, 0.0328, 0.0213, 0.0139, 0.009,
  0.00586,
];
var bODistRates = [
  0.0113, 0.0313, 0.0642, 0.1121, 0.1768, 0.2599, 0.3629, 0.4871, 0.6339,
  0.8045, 1,
];

var bOPostDistRates = [];
// var growthRate = 0.025;

// var PEMVAfterGrowth = currentPrivateEquityMV * (1 + growthRate) ** numYears;
// var totalMVAfterGrowth = currentTotalMV * (1 + growthRate) ** numYears;

// var requiredFunds =
//   (PEMVAfterGrowth - totalMVAfterGrowth * newPrivateEquityWeight) /
//   (newPrivateEquityWeight - 1);

bODistRates.forEach((v) => {
  let r = 1 - v;
  bOPostDistRates.push(r);
});

const year = new Date().getFullYear();
const years = Array.from(new Array(20), (val, idx) => idx + year);
const years2 = Array.from(new Array(20), (val, idx) =>
  JSON.parse(`{"value": "${idx + year}", "label": "${idx + year}"}`)
);

export {
  bOCapitalRates,
  bODistRates,
  bOPostDistRates,
  bOCapital,
  year,
  years,
  years2,
};
