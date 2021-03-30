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

function loadMessages() {
    $.ajax({
        url: "/api/messages",
        dataType: "json",
        method: "get",
        success: function (data) {
            let receivedMsg = `
            <table style="width:100%;text-align: center;" id="sent_messages_list">
            <tr>
                <th>Message</th>
                <th>Sender</th>
                <th>Received At</th>
            </tr>`
            let sentMsgs = `
            <table style="width:100%;text-align: center;" id="sent_messages_list">
            <tr>
                <th>Message</th>
                <th>Sent At</th>
            </tr>`
            console.log('data', data)
            console.log('length', data.allMessages.length)
            data.allMessages.forEach((a) => {
                console.log('senderName', a.receiverName)
                if (data.allMessages.length > 0) {
                    if (a.receiverName === data.user.name) {
                        receivedMsg +=
                            `<tr>
                            <td>${a.message}</td>
                            <td>${a.senderName}</td>
                            <td>${a.date}</td>
                        </tr>`
                    }
                    if (a.senderName === data.user.name) {
                        sentMsgs +=
                            `<tr>
                                <td>${a.message}</td>
                                <td>${a.date}</td>
                            </tr>`
                    }
                }
                else {
                    receivedMsg +=
                        `<tr>
                            <td></td>
                            <td>There are no messages</td>
                            <td></td>
                        </tr>`
                    sentMsg +=
                        `<tr>
                            <td>There are no messages</td>
                            <td></td>
                        </tr>`
                }

            })
            sentMsgs += `</table>`
            receivedMsg += `</table>`
            $("#sent_messages_list").html(sentMsgs)
            $("#received_messages_list").html(receivedMsg)
        },
        error: function (j, t, e) {
            window.alert("Error, Invalid Details")
            window.location.href = '/'
        }
    })
}

var highestMessage;

async function submitMessage() {
    let message = $("#txtMessage").val().trim();
    let receiver = await $("#contact-list  option:selected").val();
    // console.log(message + "hhhhhhhhhhhhhhhhhhhhhhhhhh")
    if (message === "" || receiver === "") {
        alert("You have to provide a receiver name, and a message")
        return
    }
    let userDetails = {
        message: message,
        receiver: receiver,
    }
    await $.ajax({
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(userDetails),
        url: "/api/messages",
        success: function (data, textStatus, jqXHR) {
            if (jqXHR.status !== 201) {
                alert("Problem with server");
            }
            else {
                window.location.href = "/amaChat.html"
            }
        },
        error: function (soemthing, status, error) {
            console.log(status, error);
        }
    });
}

// function updateUser() {
//     console.log("Changing user")
//     highestMessage = 0
//     $("#chat-messages-inner").html("")
//     updateMessages()
// }


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
    loadMessages()
    setInterval(loadMessages, 1000);
    $("#logout-button").on('click', doLogout);
})