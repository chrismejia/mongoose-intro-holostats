function scrapeData() {
  // collect all table rows with class "tr-mat-row"
  const tableRows = document.querySelectorAll("tr.mat-row");

  // create an array to store extracted row data
  const rowsCollected = [];

  // iterate through rows
  for (const row of tableRows) {
    // child data column is combined into a tab-separated string found on `innerText`; split it
    const separated = row.innerText.split("\t");

    // first array entry is a blank string; placeholder for image, remove it
    separated.shift();

    // push split data into main collection
    rowsCollected.push(separated);
  }
}
