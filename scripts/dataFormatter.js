const fs = require("fs");
const collected = require("./collectedData");

function dataFormatter(data) {
  return data.map((holomem) => {
    return {
      name: holomem[0],
      subscribers: {
        current: holomem[1],
        growthLastDay: holomem[2],
        growthLastWeek: holomem[3],
        growthLastMonth: holomem[4],
      },
      views: {
        current: holomem[5],
        growthLastDay: holomem[6],
        growthLastWeek: holomem[7],
        growthLastMonth: holomem[8],
      },
    };
  });
}

const output = dataFormatter(collected);
const stringified = JSON.stringify(output, null, 2);

fs.writeFile("formattedData.json", stringified, "utf8", (err) => {
  if (err) {
    console.error(err);
  }
  console.log("output written to `formattedData.json`");
});
