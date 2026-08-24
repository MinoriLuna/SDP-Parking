const token = document.getElementById("token");
token.value = getCookie('token');
function end() {
    apiCall('form', function(response, error) {
        if (response !== null) {
            // Handle successful response here
            response = JSON.parse(response);
            // write to indexedDB
            pid = JSON.parse(response.msg)['pid'];
            console.log(pid);
            saveDataToLocalStorage(response.msg);
            window.alert("Parking ended, please proceed to payment.");
            window.location.href = "./userpayment.html";
        } else {
            // Handle error here
            console.error("Error:", error);
        }
    });
};

function saveDataToLocalStorage(jsonData) {
    // Store the JSON data in localStorage
    localStorage.setItem('parking', jsonData);
}