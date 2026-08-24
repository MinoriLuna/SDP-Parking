// general API function that prevent default action
// gets method and endpoint from form and forge request
// return xhr data on end
function apiCall(selector, callback) {
    const form = document.getElementById(selector);
    form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const xhr = new XMLHttpRequest();
        const endpoint = form.action;
        const method = form.method;
        switch (method) {
            case "POST":
            case "post":
                xhr.open(method, endpoint, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            console.debug("API Response:", xhr.responseText);
                            callback(xhr.responseText, null); // Call the callback with response data
                        } else {
                            console.error("API Error:", xhr.statusText);
                            callback(null, xhr.statusText); // Call the callback with an error
                        }
                    }
                };
                xhr.send(formData);
                break;
            case "GET":
            case "get":
                xhr.open(method, endpoint + '?' + new URLSearchParams(formData).toString(), true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            console.debug("API Response:", xhr.responseText);
                            callback(xhr.responseText, null); // Call the callback with response data
                        } else {
                            console.error("API Error:", xhr.statusText);
                            callback(null, xhr.statusText); // Call the callback with an error
                        }
                    }
                };
                xhr.send();
                break;
        }
        
    };
}

// general function to get cookie by name
function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
}

// check if user is logged in
window.addEventListener('load',(event) => {
    // check for existing cookie
    if (!getCookie('token')) {
        // check for current location to prevent infinite loop
        if (!window.location.pathname.match(/login.html/g)){
            window.location.pathname = "./login.html";
        }
    }
    const userid = document.getElementById("userid");
    (userid != null) ? userid.append(getCookie("uid")) : null;
});

// dev console.log function, stay at bottom
// DO NOT DELETE!!!
const con = {
	log: function(msg) {
  (typeof urmom !== 'undefined') ? console.log(msg) : null;
  },
  err: function(msg) {
  (typeof urmom !== 'undefined') ? console.error(msg) : null;
  }
};