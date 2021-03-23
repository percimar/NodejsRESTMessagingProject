function loadContacts() {
    $.ajax({
        url: "/api/contacts",
        dataType: "json",
        method: "get",
        success: function (data) {
            let listContent = ""
            if (data.type === "admin") {
                listContent +=
                    `<div id="edit" style="display: block; padding-left: 25%; padding-top: 5%;">
                    <table>
                        <tr>
                            <td>Id <input id='id'></td>
                            <td>Name <input id='name'></td>
                            <td>Phone <input id='phone'></td>
                            <td><button id='edit-button'>Update</button></td>
                        </tr>
                    </table>
                </div>`
            }
            listContent +=
                `<div class="page-content page-container" id="page-content">
                                <div class="padding">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="list list-row block" style=" padding-left: 25%;"> 
                                            <h1> Contact List </h1>`
            data.allContacts.forEach((a) => {
                listContent +=
                    `<div class="list-item" data-id="19">
                    <div><a href="#" data-abc="true"><span class="w-48 avatar gd-warning">S</span></a></div>
                    <div class="flex"> <a href="#" class="item-author text-color" data-abc="true">${a.name}</a>
                        <div class="item-except text-muted text-sm h-1x">Id: ${a.id}</div>
                        <div class="item-except text-muted text-sm h-1x">Phone: ${a.phone}</div>
                        </div>
                    </div> `

            })
            listContent +=
                `
                                         </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                `
            $("#contact-list").html(listContent)
            $("#edit-button").on('click', edit)
        },
        error: function (j, t, e) {
            // window.alert("Error, Invalid Details")
            window.location.href = '/'
        }
    })
}

function edit() {
    let id = $("#id").val();
    let name = $("#name").val();
    let phone = $("#phone").val();
    changeRequest = {
        newName: name,
        newPhone: phone
    }
    $.ajax({
        url: `/api/contact/${id}`,
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify(changeRequest),
        success: function (result) {
            window.location.href = "/fulllist.html"
        },
        error: function (j, t, e) {
            window.alert("Wrong Details")
            // window.location.href = '/'
        }
    })
}

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