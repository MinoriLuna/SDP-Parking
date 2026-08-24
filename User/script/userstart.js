const token = document.getElementById("token");
token.value = getCookie('token');
function start() {
    apiCall('form',function(response, error) {
        if (response !== null) {
            // Handle successful response here
            response = JSON.parse(response);
            window.alert("Parking:"+response.msg);
            window.location.href = "./index.html";
        } else {
            // Handle error here
            console.error("Error:", error);
            window.alert("Parking:"+error);
        }
    });
};