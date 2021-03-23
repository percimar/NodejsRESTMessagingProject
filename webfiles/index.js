function doLogin() {
    let un = $("#username").val();
    let pw = $("#password").val();

    loginRequest = {
        username: un,
        password: pw
    }

    $.ajax({
        url: "/api/login",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(loginRequest),
        success: function (result) {
            window.location.href = "/fulllist.html"
        },
        error: function (j, t, e) {
            alert("Go away!")
            console.log(e);
        }

    })
    return false
}

$("#login-button").on('click', doLogin)