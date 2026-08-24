const token = document.getElementById("token");
token.value = getCookie('token');
function retrieve() {
    apiCall('form',function(response, error) {
        if (response !== null) {
            // Handle successful response here
            response = JSON.parse(response);
            updateTable(response.msg);
        } else {
            // Handle error here
            window.alert("Please login and try again.");
            console.error(error);
        }
    });
};


// Function to update the table with the data array
function updateTable(dataArray) {
    const table = document.getElementById('parkingTable');
    const tbody = table.querySelector('tbody');
    (typeof dataArray == 'string') ? dataArray = JSON.parse(dataArray) : null;
    // Clear the existing table rows
    tbody.innerHTML = '';

    // Iterate through the dataArray and create table rows
    dataArray.forEach((dataItem) => {
        const row = document.createElement('tr');

        // Iterate through the dataItem properties (columns)
        for (const key in dataItem) {
            if (dataItem.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = dataItem[key];
                row.appendChild(cell);
            }
        }

        tbody.appendChild(row);
    });
}

function toggleDateInput() {
    const dateMonthInput = document.getElementById("date-month");
    const dateRangeInput = document.getElementById("date-range");

    if (document.getElementById("radio-month").checked) {
        dateMonthInput.style.display = "block";
        dateRangeInput.style.display = "none";
    } else if (document.getElementById("radio-range").checked) {
        dateMonthInput.style.display = "none";
        dateRangeInput.style.display = "block";
    }
}