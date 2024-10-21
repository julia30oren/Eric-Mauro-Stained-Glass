const host = 'http://13.59.200.71:3000';
let portfolio;

const imgTableUpdateSection = document.querySelector('#img-table-update');
const logInSection = document.querySelector('#log-in');
const logInUserInput = document.querySelector('#log-in-user');
const logInPasswordInput = document.querySelector('#log-in-password');
const logInBtn = document.getElementById('log-in-btn');
const invalidInfo = document.querySelector('#invalid-info');

var table = document.querySelector('table tbody');
const add_btn = document.querySelector('#add-img-btn');
const addSection = document.querySelector('#add-image');
const openAddBtn = document.querySelector('#open-add-section-btn');
const closeAddBtn = document.querySelector('#close-add-btn');

const updateSection = document.querySelector('#update-image');
const updateBtn = document.querySelector('#update-img-btn');
const closeUpdateBtn = document.querySelector('#close-update-btn');
const title_input_update = document.querySelector('#update-name-input');
const description_input_update = document.querySelector('#update-description-input');
const date_input_update = document.querySelector('#update-date-input');

function setCookie(cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "username=" + cvalue + ";" + expires + ";path=/";

    checkCookie()
}

function getCookie() {
    let admin_name;
    let decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie) {
        admin_name = decodedCookie.split("=").pop();
        if (admin_name) return admin_name;
        else return null;
    } else return null;
}

function checkCookie() {
    console.log('checkCookie()');

    if (getCookie()) {
        console.log(getCookie());
        logInSection.hidden = true;
        imgTableUpdateSection.hidden = false;
        console.log("User loged-in");
    } else {
        console.log("User NOT loged-in");
    }
}

function adminValidationCheck(user, pass) {
    fetch(host + '/admin/' + user + '/' + pass)
        .then(response => response.json())
        .then(data => {
            if (data[0]) {
                logInSection.hidden = true;
                imgTableUpdateSection.hidden = false;
                setCookie(logInUserInput.value);
            } else {
                invalidInfo.innerHTML = `<sapn class="red-txt">* User/Password incorrect.</sapn>`
            }
        });
}

logInBtn.addEventListener('click', (event) => {
    console.log('logInBtn click');
    invalidInfo.innerHTML = ``;

    if (!logInUserInput.value && !logInPasswordInput.value) {
        invalidInfo.innerHTML = `<sapn class="red-txt">* User can not be empty.</sapn><br><sapn class="red-txt">* Password can not be empty.</sapn>`
    } else if (!logInUserInput.value && logInPasswordInput.value) {
        invalidInfo.innerHTML = `<sapn class="red-txt">* User can not be empty.</sapn>`
    } else if (logInUserInput.value && !logInPasswordInput.value) {
        invalidInfo.innerHTML = `<sapn class="red-txt">* Password can not be empty.</sapn>`
    } else {
        adminValidationCheck(logInUserInput.value, logInPasswordInput.value);
    }
});

table.addEventListener('click', (event) => {
    if (event.target.className === "delete-row-btn btn btn-danger") {
        deleteImageById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn btn btn-warning") {
        handleEditImage(event.target.dataset.id);
    }
});

function deleteImageById(id) {
    fetch(host + '/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });
}

function handleEditImage(id) {
    updateSection.hidden = false;

    portfolio.forEach(element => {
        if (element.id === Number(id)) {
            title_input_update.value = element.title;
            description_input_update.value = element.description;
            date_input_update.value = element.createdAt.substring(0, 10);
        }
    });

    title_input_update.dataset.id = id;
}

openAddBtn.onclick = () => {
    addSection.hidden = false;
}

closeAddBtn.onclick = () => {
    addSection.hidden = true;
}

updateBtn.onclick = () => {
    fetch(host + '/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: title_input_update.dataset.id,
            name: title_input_update.value,
            description: description_input_update.value,
            date: date_input_update.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}

closeUpdateBtn.onclick = () => {
    updateSection.hidden = true;
    title_input_update.value = '';
}

add_btn.onclick = () => {
    const title_input = document.querySelector('#name-input');
    const title = title_input.value;
    title_input.value = "";

    const img_input = document.querySelector('#img-url-input');
    const url = img_input.value;
    img_input.value = "";

    const description_input = document.querySelector('#description-input');
    const description = description_input.value;
    description_input.value = "";

    const date_input = document.querySelector('#date-input');
    const date = date_input.value;
    date_input.value = "";

    if (url && url.length > 5) {
        if (isValidUrl(url)) {
            fetch(host + '/insert', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ title: title, url: url, description: description, date: date })
            })
                .then(response => response.json())
                .then(data => insertRowIntoTable(data['data']));
            addSection.hidden = true;
        } else {
            const invalidFeedback2 = document.querySelector('#invalid-feedback-2');
            invalidFeedback2.hidden = false;
        }
    } else {
        const invalidFeedback1 = document.querySelector('#invalid-feedback-1');
        invalidFeedback1.hidden = false;
    }

};

function insertRowIntoTable(data) {
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'url') {
                data[key] = `<img src="${data[key]}" class="thumbnail">`;
            }
            if (key === 'createdAt') {
                data[key] = new Date(data[key]).toLocaleDateString();
            }
            tableHtml += `<td>${data[key] ? data[key] : ''}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn btn btn-danger" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn btn btn-warning" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLtable(data) {
    if (data.length === 0) {
        table.innerHTML = `<tr>
                                <td class='no-data' colspan='5'>No Data</td>
                            </tr>`;
        return;
    }

    let tableHtml = "";

    data.forEach(element => {
        tableHtml += "<tr>";
        tableHtml += `<td><img src="${element.url}" class="thumbnail" alt="Bad Thumbnail URL"></td>`;
        tableHtml += `<td>${element.title ? element.title : '<span class="grey-txt">No Title</span>'}</td>`;
        tableHtml += `<td>${element.description ? element.description : '<span class="grey-txt">No Description</span>'}</td>`;
        tableHtml += `<td>${new Date(element.createdAt).toLocaleDateString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn btn btn-danger" data-id=${element.id}>Delete <button class="edit-row-btn btn btn-warning" data-id=${element.id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};

document.addEventListener('DOMContentLoaded', () => {
    checkCookie();

    fetch(host + '/getall')
        .then(res => res.json())
        .then(data => {
            loadHTMLtable(data['data']);
            portfolio = data['data'];
        });
});

const isValidUrl = urlString => {
    var inputElement = document.createElement('input');
    inputElement.type = 'url';
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
        return false;
    } else {
        return true;
    }
}