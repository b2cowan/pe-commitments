import "./starters.js";

function findCommRate(cap, dist, g, n) {
  let x = n;
  let tempDistRates = [];
  dist.forEach((t) => {
    tempDistRates.push(t);
  });
  let results = [];
  while (x > 0) {
    let idx = cap.length - x;
    let pD = tempDistRates.reduce(function (product, value) {
      return product * value;
    });
    let c = cap[idx];
    let gr = (1 + g) ** x;
    let commRateSingleYear = gr * c * pD;
    results.push(commRateSingleYear);
    tempDistRates.shift();
    x--;
  }

  let commRate = results.reduce(function (product, value) {
    return product + value;
  });

  return commRate;
}

function findCommitments(capital, postdist, growth, periods) {
  let num = periods;
  let g = growth;
  let nCapital = capital.slice(0, num);
  let nPostDistRates = postdist.slice(0, num);
  let results = { capFactors: [], sumCapFactors: 0 };

  console.log("Capital Factors: " + nCapital);
  console.log("Distribution Factors: " + nPostDistRates);
  while (num > 0) {
    let capFact = findCommRate(nCapital, nPostDistRates, g, num);
    results.capFactors.push(capFact);
    nPostDistRates.pop();
    nCapital.pop();
    num--;
  }

  results.sumCapFactors = results.capFactors.reduce(function (product, value) {
    return product + value;
  });
  
  console.log("Weight Factors: " + results.capFactors);
  console.log("Total Weight Factor: " + results.sumCapFactors);
  return results;
  
}


export { findCommitments };
