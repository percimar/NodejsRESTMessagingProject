function doLogin() {
    let un = $("#username").val();
    let pw = $("#password").val();

    const loginRequest = {
        username: un,
        password: pw
    }

    $.ajax({
        url: "/api/login",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(loginRequest),
        success: function () {
            window.location.href = "/amaChat.html"
        },
        error: function () {
            alert("Go away!")
        }

    })
    return false
}

$("#login-button").on('click', doLogin)