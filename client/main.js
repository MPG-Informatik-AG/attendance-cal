function button_clicked() {
    let value = document.getElementById("name-input").value
    console.log(value)

    var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:6677/postname", true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        name: value
    }))
}