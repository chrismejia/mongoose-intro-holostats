const fs = require("fs");
const formatted = require("./formattedData.json");

function numberCoercer(arr) {
  for (let holoObj of arr) {
    const { subscribers, views } = holoObj;

    for (let category in subscribers) {
      const coercedNum = +subscribers[category].replace(/,/g, "");
      subscribers[category] = coercedNum;
    }
    for (let category in views) {
      const coercedNum = +views[category].replace(/,/g, "");
      views[category] = coercedNum;
    }
  }
  return arr;
}

numberCoercer(formatted);
