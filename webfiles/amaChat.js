function loadContacts() {
    $.ajax({
        url: "/api/contacts",
        dataType: "json",
        method: "get",
        success: function (data) {
            let listContent = ""
            console.log('data', data)
            if (data.user.type === "admin") {
                data.allContacts.forEach((a) => {
                    listContent +=
                        `
                        <option value="${a.id}">${a.username}</option>
                        `
                })
                console.log(listContent)
            } else {
                data.allContacts.forEach((a) => {
                    if (a.username != data.user.name) {
                        listContent +=
                            `
                        <option value="${a.id}">${a.username}</option>
                        `
                    }
                })
                console.log(listContent)
            }
            $("#contact-list").html(listContent)
        },
        error: function (j, t, e) {
            window.alert("Error, Invalid Details")
            window.location.href = '/'
        }
    })
}

var highestMessage;

function submitMessage() {
    let message = $("#txtMessage").val().trim();
    let sender = $("#txtSender").val().trim();
    let receiver = $("#txtReceiver").val().trim();
    let room = $("#roomNumber option:selected").val();


    if (message === "" || sender === "" || receiver === "") {
        alert("You have to provide a sender name, receiver name, and a message")
        return
    }

    $.ajax({
        type: "POST",
        dataType: "JSON",
        data: {
            message: message,
            sender: sender,
            receiver: receiver,
            room: room
        },
        url: "./postMessage.php",
        success: function (data) {
            if (data !== "OK") {
                alert("Problem with server");
            }
            else {
                $("#txtMessage").val("");
                $("#chat-messages").animate({ scrollTop: $("#chat-messages")[0].scrollHeight }, 1000);

            }
        }
    });
}

function updateUser() {
    console.log("Changing user")
    highestMessage = 0
    $("#chat-messages-inner").html("")
    updateMessages()
}

function updateMessages() {
    let touser = $("#contact-list option:selected").val()
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "./getMessages.php?startid=" + touser,
        success: function (msg) {
            var tableContents = "";
            if (msg.totalMessages === 0) {
                highestMessage = 0;
                $("#chat-messages-inner").html("");
            }
            for (i = 0; i < msg.messages.length; i++) {

                formattedMessage = msg.messages[i].message.split("\n").join("<br />");
                tableContents += "<p><span class='msg-block'>"
                    + "From <strong>" + msg.messages[i].sender + "</strong> To:<strong>"
                    + msg.messages[i].receiver + "</strong>"
                    + "<span class='time'>" + msg.messages[i].time + "</span>"
                    + "<span class='msg'>" + formattedMessage + "</span></span></p>";

                highestMessage = msg.messages[i].id;
            }
            $("#chat-messages-inner").append(tableContents);
        }
    });
}

$(function () {
    $("#sidebar li").removeClass("active");
    $("#menuLinkBoard").addClass("active");

    highestMessage = 0;
    setInterval(updateMessages, 1000);

});

function doLogout() {
    $.ajax({
        url: "/api/logout",
        method: "post",
        success: function (result) {
            window.location.href = '/'
        },
        error: function (x, t, s) {
            window.location.href = '/'
        }
    })
}

$(function () {
    loadContacts()
    $("#logout-button").on('click', doLogout);
})