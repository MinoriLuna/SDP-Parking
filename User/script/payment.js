function jsonToTable(jsonObject) {
    if (typeof jsonObject !== 'object') {
        console.error("Input is not a JSON object.");
        return;
    }
    let tableHTML = "";
    for (let key in jsonObject) {
        tableHTML += `<tr><td>${key}</td><td>${jsonObject[key]}</td></tr>`;
    }
    const feeTable = document.getElementById("fees");
    const tbody = feeTable.querySelector('tbody');
    tbody.innerHTML = tableHTML; // Replace the existing table content
}

function getRates() {
    apiCall('rates',function(response, error) {
        if (response !== null) {
            // Handle successful response here
            const button = document.getElementById("getrates");
            button.style.display = "none";
            response = JSON.parse(response);
            jsonToTable(JSON.parse(response.msg));
        } else {
            // Handle error here
            console.error("Error:", error);
        }
    });
}

function pay() {
    const token = document.getElementById("token");
    const pid = document.getElementById("pid");
    const total = document.getElementById("total");
    const lot = document.getElementById("lot");
    const plate = document.getElementById("plate");
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    const time = document.getElementById("time");
    let data = JSON.parse(localStorage.getItem('parking'));
    token.value = getCookie('token');
    pid.value = data['pid'];
    total.innerHTML = data['amount'];
    lot.innerHTML = data['lotID'];
    plate.innerHTML = data['plateno'];
    start.innerHTML = data['start'];
    end.innerHTML = data['end'];
    time.innerHTML = new Date(data['duration'] * 1000).toISOString().substr(11, 8);
    apiCall('pay',function(response, error) {
        if (response !== null) {
            response = JSON.parse(response);
            msg = JSON.parse(response.msg);
            console.debug(msg['url']);
            ppp.style.display = "block";
            url.innerText = msg['url'];
        } else {
            console.error("Error:", error);
        }
    });
}

const ppp = document.getElementById('paymentRedirect');
const close = document.getElementById("pppclose");
const url = document.getElementById("url");
const paynow = document.getElementById("paynow");

window.addEventListener('message', event => {
    // Check if the message is from the expected origin
    if (event.origin === 'https://backend.svrcd.xyz') {
        // Handle the message from the new tab
        switch(event.data){
            case 600:
                window.popup("Payment incomplete, please wait and check the status later.");
                break;
            case 601:
                window.popup("Payment successful!");
                window.location.href = "./index.html";
                break;    
            case 603:
                window.popup("Payment failed, please try again");
                break;
            default:
                window.popup("An error occurred. Please contact support.")
                break;
        }
        
    }
});


//======== modal codes ========
close.onclick = function() {
    ppp.style.display = "none";
};
paynow.onclick = function() {
    window.open(url.innerText, "_blank");
};

window.onclick = function(event) {
    if (event.target == ppp) {
        ppp.style.display = "none";
    }
};