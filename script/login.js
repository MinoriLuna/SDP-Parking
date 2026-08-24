// do a normal post logged-in user check
window.addEventListener('load',(event) => {
    // check for existing cookie
    if (getCookie('token')) {
        window.location.href = "./User/index.html";
    }
    // load default listener
    const form = document.getElementById("form");
    form.onsubmit = (event) => {
        event.preventDefault();
        login();
    };
});

function createCookie(name, value, days) {
    let expires;
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
}

function login() {
    const form = document.getElementById("form");
    const _banner = document.getElementById('banner');
    form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const xhr = new XMLHttpRequest();
        const endpoint = document.getElementById('form').action;
        const method = document.getElementById('form').method;
        xhr.open(method, endpoint, true);
        xhr.onreadystatechange = function () {
            console.log("test");
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log("API Response:", xhr.responseText);
                    let _xhr = JSON.parse(xhr.responseText);
                    let dxhr = atob(_xhr.token);
                    // issue cookie 
                    if (dxhr.match(/:/g)) {
                        _banner.innerHTML = "Login Successful";
                        _banner.style.color = "green";
                        _banner.style.display = "block";
                        dough = dxhr.split(":");
                        date = 0;
                        if (document.getElementById('remember').checked) {
                            date = 400;  // 400 days to comply with chrome max
                        } else {
                            date = 7;   // 1 week time
                        }
                        createCookie('token',_xhr.token, date);
                        createCookie('uid',dough[0], date);
                        createCookie(dough[2], dough[1], date);
                        window.location.href = "./User/index.html";
                    }
                } else {
                    console.error("API Error:", xhr.statusText); // Corrected from console.err
                    _banner.innerHTML = "API Error: " + xhr.statusText; // Corrected from error
                    _banner.style.color = "red";
                    _banner.style.display = "block";
                }
            }
        };
        xhr.send(formData);
    };
}
