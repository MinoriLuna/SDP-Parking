function signup() {
    const form = document.getElementById("form");
    form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const xhr = new XMLHttpRequest();
        const endpoint = document.getElementById('form').action;
        const method = document.getElementById('form').method;
        xhr.open(method, endpoint, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    //con.log("API Response:", xhr.responseText);
                    _banner.innerHTML = "User creation success";
                    _banner.style.color = "green";
                    _banner.style.display = "block";
                    window.location.href="./login.html";
                } else {
                    //con.err("API Error:", xhr.statusText);
                    _banner.innerHTML = "User creation failed:" + xhr.msg;
                    _banner.style.color = "red";
                    _banner.style.display = "block";
                }
            }
        };
        xhr.send(formData);
    };
}