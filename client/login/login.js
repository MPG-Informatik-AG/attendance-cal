function button_clicked() {
    let name = document.getElementById("name-input").value
    let pass = document.getElementById("pass-input").value
    console.log(name)

    var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:6677/postname", true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        name: name,
        password: pass
    }))
}