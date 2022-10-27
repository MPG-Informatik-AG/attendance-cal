function button_clicked() {
    let name = document.getElementById("name-input").value
    let pass = document.getElementById("pass-input").value
    
    let loginhash = sha512(`${name}:${pass}Attendance`)

    var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:6677/login", false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        loginhash: loginhash
    }))
    if (xhr.status == 200) {
        setCookie("loginhash", loginhash, 7)
        document.location = "../"
    } else {
        document.getElementById("error-text").innerHTML = xhr.responseText
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    let expires = "expires="+ d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}