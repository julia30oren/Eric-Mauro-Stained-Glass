const localhost = 'http://localhost:3000';
let portfolio;

document.querySelector('table tbody').addEventListener('click', (event) => {
    if (event.target.className === "delete-row-btn") {
        deleteImageById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditImage(event.target.dataset.id);
    }
});

function deleteImageById(id) {
    fetch(localhost + '/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            if (data.success) {
                location.reload();
            }
        });
}

const updateBtn = document.querySelector('#update-img-btn');

function handleEditImage(id) {
    const updateSection = document.querySelector('#update-image');
    updateSection.hidden = false;

    portfolio.forEach(element => {
        if (element.id === Number(id)) {
            const title_input_update = document.querySelector('#update-name-input');
            title_input_update.value = element.title;
        }
    });

    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = () => {
    const updateNameInput = document.querySelector('#update-name-input');

    fetch(localhost + '/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}

const add_btn = document.querySelector('#add-img-btn');

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

    fetch(localhost + '/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ title: title, url: url, description: description, date: date })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
};

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
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

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLtable(data) {
    const table = document.querySelector('table tbody');
    // console.log(data);
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
        tableHtml += `<td><img src="${element.url}" class="thumbnail"></td>`;
        tableHtml += `<td>${element.title ? element.title : ''}</td>`;
        tableHtml += `<td>${element.description ? element.description : ''}</td>`;
        tableHtml += `<td>${new Date(element.createdAt).toLocaleDateString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${element.id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${element.id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
};

document.addEventListener('DOMContentLoaded', () => {
    fetch(localhost + '/getall')
        .then(res => res.json())
        .then(data => {
            loadHTMLtable(data['data']);
            portfolio = data['data'];
        });
});