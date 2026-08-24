const token = document.getElementById("token");
const map = document.getElementById("map");
token.value = getCookie('token');
function refresh() {
    apiCall('form',function(response, error) {
        if (response !== null) {
            // Handle successful response here
            response = JSON.parse(response);
            updateTable(response.msg);
        } else {
            // Handle error here
            window.alert("Please refresh the page and try again.");
            map.innerHTML = error;
        }
    });
};


// Function to update the table with the data array
function updateTable(dataArray) {
    const table = document.getElementById('parkingTable');
    const tbody = table.querySelector('tbody');
    (typeof dataArray == 'string') ? dataArray = JSON.parse(dataArray) : null;
    tbody.innerHTML = '';
    map.style.display = "block";
    dataArray.forEach((dataItem) => {
        const row = document.createElement('tr');
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
