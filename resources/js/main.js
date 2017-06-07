var sessionUser;
var sessionUserId;
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
dbdata = {
    t: [],
    c: []
};

if (datefield.type !== "date") { //if browser doesn't support input type="date", initialize date picker widget:
    jQuery(function ($) { //on document.ready
        $('#datepicker').datepicker();
    })
}
//login click
document.getElementById('logowanie').addEventListener('click', function () {
    getLoginData();
});
//login enter
document.getElementById('userPassword').addEventListener('keydown', function (e) {
    if (e.code === 'Enter') {
        getLoginData();
    }
});
//get login data from fields
function getLoginData() {
    var user = document.getElementById('userName').value;
    var pass = document.getElementById('userPassword').value;
    var url = "log.php";
    if (user.length > 0 && pass.length > 0) {
        var data = {
            username: [],
            password: []
        };
        data.username = user;
        data.password = pass;
        data = JSON.stringify(data);
        sendDataPost(url, data, login);
    } else {
        window.location.href = "index.html";
    }
}
//logout
function logOut() {
    sessionUser = '';
    sessionUserId = '';
    window.location.href = "index.html";
}
//login proces
function login(resp) {
    json = JSON.parse(resp);
    if (typeof json.user !== 'undefined') {
        sessionUser = json.user;
        sessionUserId = json.id;
        document.getElementById('id01').remove();
        document.getElementById('logbtn').remove();
        var wel = document.getElementById('user');

        var txt = document.createElement('h3');
        txt.value = 'Welcome' + sessionUser;
        txt.innerText = 'Welcome ' + sessionUser;
        txt.setAttribute('style', ' float: left');

        var logoutBtn = document.createElement('button');
        logoutBtn.value = 'Log Out';
        logoutBtn.innerText = 'Log Out';
        logoutBtn.setAttribute('id', 'logoutBtn');
        logoutBtn.addEventListener('click', logOut);
        wel.appendChild(txt);
        wel.appendChild(logoutBtn);
        wel.classList.add('texthead');
        getRecords(sessionUserId);
    } else if (json.message === 'INCORECT USER or PASSWORD') {
        alert(json.message);
    }
}
//get records from db and render list
function getRecords(userId) {
    getDataGet('todoget.php?user=' + userId, function (jsonRsponse) {
        dbdata.t = jsonRsponse;
        if (dbdata.c.length > 0) {
            renderList();
        }
    });
    getDataGet('completeget.php?user=' + userId, function (jsonRsponse) {
        dbdata.c = jsonRsponse;
        if (dbdata.t.length > 0) {
            renderList();
        }
    });
}
//get records from db and update data
function refreshData() {
    getDataGet('todoget.php?user=' + sessionUserId, function (jsonRsponse) {
        dbdata.t = jsonRsponse;
        printIntoTheConsole('refresh data' + jsonRsponse);
    });
    getDataGet('completeget.php?user=' + sessionUserId, function (jsonRsponse) {
        dbdata.c = jsonRsponse;
        printIntoTheConsole('refresh data' + jsonRsponse);
    });
}
function getDataGet(url, context) {
    var json;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        response = xhr.responseText;
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (response === '0 results[]') {
                return
            }
            json = JSON.parse(xhr.responseText);
            context(json);
        }
    };
    xhr.send();
}
function sendDataPost(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resp = xhr.responseText;
            callback(resp);
            refreshData();

        }
    };
}
document.getElementById('add').addEventListener('click', function () {
    var txValue = document.getElementById('item').value;
    var dateValue = document.getElementById('datepicker').value;
    if (txValue && dateValue) {
        if (!isNotValidDate(dateValue)) // var res = str.substring(0, 1);
        {
            var reformatDate = dateValue.substring(6) + '-' + dateValue.substring(0, 2) + '-' + dateValue.substring(3, 5);
            dateValue = reformatDate;
        }
        addItemToList(txValue, dateValue);
    }
});
function isNotValidDate(date) {
    var matches = /^(\d{1,2})[\/](\d{1,2})[\/](\d{4})$/.exec(date);
    if (matches === null) return false;
    var d = matches[2];
    var m = matches[1] - 1;
    var y = matches[3];
    var composedDate = new Date(y, m, d);
    return composedDate.getDate() === d &&
        composedDate.getMonth() === m &&
        composedDate.getFullYear() === y;
}
document.getElementById('item').addEventListener('keydown', function (e) {
    var txValue = this.value;
    var dateValue = document.getElementById('datepicker').value;
    if (e.code === 'Enter' && txValue && dateValue) {
        addItemToList(txValue, dateValue);
    }
});
function addItemToList(txValue, dateValue) {
    if (sessionUser.length > 0) {
        prepareJsonAndSendPost("todoinsert.php", txValue, dateValue);
        var time = new Date();
        addItemTODO(txValue, dateValue, time, false);
        document.getElementById('item').value = '';
        document.getElementById('datepicker').value = '';
    }
}
function removeItem(e) {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.getElementsByTagName('p');
    var htmlTx = value[3].innerText;
    var removeUrl;
    var itemToRemove;
    var idToRemove;
    if (id === 'todo') {
        for (var i = 0; i < dbdata.t.length; i++) {
            itemToRemove = dbdata.t[i].todo;
            if (htmlTx === itemToRemove) {
                idToRemove = dbdata.t[i].todoid;
                removeUrl = 'todoremove.php?id=' + idToRemove;
            }
        }
    } else {
        for (var j = 0; j < dbdata.c.length; j++) {
            itemToRemove = dbdata.c[j].complete;
            if (htmlTx === itemToRemove) {
                idToRemove = dbdata.c[j].completeid;
                removeUrl = 'completeremove.php?id=' + idToRemove;
            }
        }
    }
    getDataGet(removeUrl, printIntoTheConsole);
    parent.removeChild(item);
}
function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var target;
    var id = parent.id;
    var value = item.getElementsByTagName('p');
    var htmlDate = value[1].innerText;
    var htmlTx = value[3].innerText;
    var htmlCompleteDate = value[5].innerText;
    var removeUrl;
    var itemToRemove;
    var idToRemove;
    if (id === 'todo') {
        target = document.getElementById('completed');
        prepareJsonAndSendPost('completeinsert.php', htmlTx, htmlCompleteDate);
        for (var i = 0; i < dbdata.t.length; i++) {
            itemToRemove = dbdata.t[i].todo.toString();
            if (htmlTx === itemToRemove) {
                idToRemove = dbdata.t[i].todoid;
                removeUrl = 'todoremove.php?id=' + idToRemove;
                item.setAttribute('style', 'background: #81c281')
            }
        }
    } else {
        target = document.getElementById('todo');
        prepareJsonAndSendPost('todoinsert.php', htmlTx, htmlCompleteDate);
        for (var j = 0; j < dbdata.c.length; j++) {
            itemToRemove = dbdata.c[j].complete.toString();
            if (htmlTx === itemToRemove) {
                idToRemove = dbdata.c[j].completeid;
                removeUrl = 'completeremove.php?id=' + idToRemove;
                item.setAttribute('style', 'background: white');
                var d = new Date().getTime();
                var htmlD = new Date(htmlCompleteDate).getTime();
                if (htmlD < d) {
                    item.setAttribute('style', 'background: #f35b5b');
                }
            }
        }
    }
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[2]);
    getDataGet(removeUrl, printIntoTheConsole);
}
function addItemTODO(text, completeTime, timestamp, completed) {
    var list;
    var d = new Date().getTime();
    var temp1 = new Date(completeTime).getTime();

    var item = document.createElement('li');
    var time = document.createElement('p');
    time.classList.add('addtext');
    time.value = 'Date: ';
    time.innerText = 'Date: ';
    var timeTx = document.createElement('p');
    timeTx.classList.add('addtext');
    timeTx.value = timestamp;
    timeTx.innerText = timestamp;

    var task = document.createElement('p');
    task.classList.add('addtext');
    task.value = 'Task: ';
    task.innerText = 'Task: ';
    var tx = document.createElement('p');
    tx.classList.add('addtext');
    tx.value = text;
    tx.innerText = text;

    var dateP = document.createElement('p');
    dateP.classList.add('addtext');
    dateP.value = 'Time to complete the task: ';
    dateP.innerText = 'Time to complete the task: ';
    var dateTx = document.createElement('p');
    dateTx.classList.add('addtext');
    dateTx.value = completeTime;
    dateTx.innerText = completeTime;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;
    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
    complete.addEventListener('click', completeItem);
    buttons.appendChild(remove);
    buttons.appendChild(complete);

    item.appendChild(time);
    item.appendChild(timeTx);
    item.appendChild(task);
    item.appendChild(tx);
    item.appendChild(dateP);
    item.appendChild(dateTx);
    item.appendChild(buttons);

    if (completed) {
        list = document.getElementById('completed');
        item.setAttribute('style', 'background: #81c281');
    } else if (!completed) {
        list = document.getElementById('todo');
        if (temp1 < d) {
            item.setAttribute('style', 'background: #f35b5b');
        }
    }
    list.insertBefore(item, list.childNodes[2]);
}
function renderList() {
    var value;
    var timestamp;
    var completeTime;
    if (dbdata.c.length > 0) {
        for (var g = 0; g < dbdata.c.length; g++) {
            value = dbdata.c[g].complete;
            timestamp = dbdata.c[g].date.toString();
            completeTime = dbdata.c[g].completeTime.toString();
            addItemTODO(value, completeTime, timestamp, true);
        }
    }
    if (dbdata.t.length > 0) {
        for (var k = 0; k < dbdata.t.length; k++) {
            value = dbdata.t[k].todo.toString();
            timestamp = dbdata.t[k].date.toString();
            completeTime = dbdata.t[k].completeTime.toString();
            addItemTODO(value, completeTime, timestamp, false);
        }
    }
    else {
        return;
    }
}
function prepareJsonAndSendPost(url, txValue, dateValue) {
    var data = {
        text: [],
        userId: [],
        user: [],
        completeTime: []
    };
    data.text = txValue;
    data.userId = sessionUserId;
    data.user = sessionUser;
    data.completeTime = dateValue;
    data = JSON.stringify(data);
    sendDataPost(url, data, printIntoTheConsole);
}
function printIntoTheConsole(text) {
    console.log(text);
}
