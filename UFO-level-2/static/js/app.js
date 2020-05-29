// from data.js
var tableData = data;

// Get table references
var tbody = d3.select("tbody");

function buildTable(data) {
    //First, celar out any existing data
    tbody.html("");

    //Next, loop through each object in the data
    //Append a row and cells for each value in the row
    data.forEach((dataRow) => {
        //Append a row to the table body
        var row = tbody.append("tr");

        //Loop through each field in the dataRow and add
        //each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            var cell = row.append("td");
            cell.text(val);
            }
        );
    });
}

//Keep track of all filters
var filters = {};

function updateFilters() {
    //Save the element, value, and id of the filter that was changed
    var changedElement = (d3.select(this).select("input"))
    var elementValue = (changedElement.property("value"))
    var filterId = (changedElement.attr("id"))


    console.log(d3.select(this).select("input"))
    console.log(changedElement.property("value"))
    console.log(changedElement.attr("id"))

    //if a filter value was entered then add that filtered value
    // to the filters list. Otherwise, clear that filter from the fitlered
    if (elementValue) {
        filters[filterId] = elementValue;
    }
    else {
        delete filters[filterId];
    }

    //console.log(Object.entries(filters))



    // Call function to apply all filters and rebuild the table
    filterTable();


}

function filterTable() {

    // Set the filtered Data to the table Data
    let filteredData = tableData;

    // Loop through all of the filteres and keep any data taht 
    // that matches the filter values
    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row =>row[key] === value);
    
    //Object.defineProperties(filters).forEach(([key, value]) => {
        //filteredData = filteredData.filter(row =>row[key] === value);
    });



    // Finally rebuild the table using the filteredd data
    buildTable(filteredData);
}


d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
























