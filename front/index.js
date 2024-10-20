const host = 'http://ec2-13-59-200-71.us-east-2.compute.amazonaws.com:3000';
let portfolio;

const imgTableUpdateSection = document.querySelector('#img-table-update');
const logInSection = document.querySelector('#log-in');
const logInUserInput = document.querySelector('#log-in-user');
const logInPasswordInput = document.querySelector('#log-in-password');
const logInBtn = document.querySelector('#log-in-btn');
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

function adminValidationCheck() {
    fetch(host + '/admin/' + logInUserInput.value + '/' + logInPasswordInput.value)
        .then(response => response.json())
        .then(data => {
            if (data[0]) {
                logInSection.hidden = true;
                imgTableUpdateSection.hidden = false;
                setCookie("username", logInUserInput.value);
            } else {
                invalidInfo.innerHTML = `<sapn class="red-txt">* User/Password incorrect.</sapn>`
            }
        });
}

logInBtn.addEventListener('click', () => {
    invalidInfo.innerHTML = ``;

    if (!logInUserInput.value && !logInPasswordInput.value) {
        invalidInfo.innerHTML = `<sapn class="red-txt">* User can not be empty.</sapn><br><sapn class="red-txt">* Password can not be empty.</sapn>`
    } else if (!logInUserInput.value && logInPasswordInput.value) {
        invalidInfo.innerHTML = `<sapn class="red-txt">* User can not be empty.</sapn>`
    } else if (logInUserInput.value && !logInPasswordInput.value) {
        invalidInfo.innerHTML = `<sapn class="red-txt">* Password can not be empty.</sapn>`
    } else adminValidationCheck();
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
            tableHtml += `<td>${data[key]}</td>`;
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
function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie("username");
    if (user && user != "") {
        console.log(user + " loged-in");
        logInSection.hidden = true;
        imgTableUpdateSection.hidden = false;
    } else {
        console.log(user + " NOT loged-in");
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
        tableHtml += `<td>${element.id}</td>`;
        tableHtml += `<td><img src="${element.url}" class="thumbnail" alt="Bad Thumbnail URL"></td>`;
        tableHtml += `<td>${element.title ? element.title : ''}</td>`;
        tableHtml += `<td>${element.description ? element.description : ''}</td>`;
        tableHtml += `<td>${new Date(element.createdAt).toLocaleDateString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn btn btn-danger" data-id=${element.id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn btn btn-warning" data-id=${element.id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;

    checkCookie();
};

document.addEventListener('DOMContentLoaded', () => {
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