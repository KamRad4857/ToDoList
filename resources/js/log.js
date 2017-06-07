var url = "SignIn.php";
var data = {
    name: [],
    surname: [],
    login: [],
    password: []
};
function signIn() {

    var un = document.getElementById('uName').value;
    var ul = document.getElementById('uLogin').value;
    var confirm_password = document.getElementById("confirm_password").value;
    var up = document.getElementById('uPassword').value;
    data.name = un;
    data.login = ul;
    data.confirmPass = confirm_password;
    data.surname = document.getElementById('uSurname').value;
    data.password = document.getElementById('uPassword').value;
    data.surname = document.getElementById('uSurname').value;
    data.password = up;
    data = JSON.stringify(data);

    if (up !== confirm_password) {
        document.getElementById('id01').style.display = 'block';
        insertTxt("Passwords Don't Match.");
        return false;
    } else {
        if (un.length > 0 && ul.length > 0) {
            sendDataPost(url, data, function (response) {
                document.getElementById('id01').style.display = 'block';
                var json = JSON.parse(response);
                var message = json.message;
                insertTxt(message);
            })
        } else {
            window.location.href = "signIn.html";
        }
    }
    return false;
}
function insertTxt(text) {
    var field = document.getElementById('siText');
    var tx = document.createElement('p');
    tx.classList.add('addtext');
    tx.setAttribute("id", "modalMessage");
    tx.value = 'Message: ' + text;
    tx.innerText = 'Message: ' + text;
    field.appendChild(tx);
}
document.getElementById('afterSignIn').addEventListener('click', function () {
    closeModal();
});
document.getElementById('afterSignIn').addEventListener('keydown', function (e) {
    if (e.code === 'Enter' || e.keyCode === 27) {
        closeModal();
    }
});
function closeModal() {
    var mess = document.getElementById('modalMessage').value;
    if (mess === 'Message: Error during creating user. Choose a different login.' || mess === "Message: Passwords Don't Match.") {
        window.location.href = "signIn.html";
    } else {
        var logData = {
            username: [],
            password: []
        };
        logData.username = data.login;
        logData.password = data.password;
        window.location.href = "index.html";
        sendDataPost(url, logData, login);
    }
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
        }
    };
}
