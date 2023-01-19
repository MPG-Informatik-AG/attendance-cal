let loginhash = null

window.onload = () => {
	loginhash = getCookie("loginhash")
	if (!loginhash) {
		window.location = "./login"
		return
	}
	getAllPersons()
	getAllAppmnts()
}

function getAllPersons() {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:6677/get/persons", false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        loginhash: loginhash
    }))
    if (xhr.status == 200) {
		document.querySelectorAll("#person-list .person").forEach(e => e.remove())

		let persons = JSON.parse(xhr.response)
		for (let p of persons) {
			document.getElementById("person-list").innerHTML += `<div class="person">- ${p.name} - ${p.id}  
			<a onclick="personToDelete = ${p.id}; document.getElementById('delete-person-popup').style.display = 'block'">delete</a></div>`
		}
    } else {
        console.error(xhr.response)
    }
}

function createPerson() {
	var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:6677/new/person", false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        loginhash: loginhash,
		name: document.getElementById("new-person-name").value
    }))
    if (xhr.status == 200) {
		getAllPersons()
		document.getElementById('new-person-popup').style.display = 'none'
    } else {
        console.error(xhr.response)
    }
}

let personToDelete = -1
function deletePerson() {
	var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:6677/delete/person", false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        loginhash: loginhash,
		id: personToDelete
    }))
    if (xhr.status == 200) {
		getAllPersons()
		document.getElementById('delete-person-popup').style.display = 'none'
    } else {
        console.error(xhr.response)
    }
}

function getAllAppmnts() {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:6677/get/appmnts", false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        loginhash: loginhash
    }))
    if (xhr.status == 200) {
		document.querySelectorAll("#appmnt-list .appmnt").forEach(e => e.remove())

		let appmnts = JSON.parse(xhr.response).sort((a, b) => a.date - b.date)
		for (let a of appmnts) {
			document.getElementById("appmnt-list").innerHTML += `<div class="appmnt">
				<h4>${a.name} - ${a.id}</h4>
                <a onclick="appmntToDelete = ${a.id}; document.getElementById('delete-appmnt-popup').style.display = 'block'">delete</a><br>
				${a.date} - ${a.end_date}
			</div>`
		}
    } else {
        console.error(xhr.response)
    }
}

let appmntToDelete = -1
function deleteAppmnt() {
	var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:6677/delete/appmnt", false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        loginhash: loginhash,
		id: appmntToDelete
    }))
    if (xhr.status == 200) {
		getAllAppmnts()
		document.getElementById('delete-appmnt-popup').style.display = 'none'
    } else {
        console.error(xhr.response)
    }
}

function createAppmnt() {
	var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:6677/new/appmnt", false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        loginhash: loginhash,
		name: document.getElementById("new-appmnt-name").value,
		date: new Date(document.getElementById("appmnt-date").value).toISOString(),
		end_date: new Date(document.getElementById("appmnt-end-date").value).toISOString(),
    }))
    if (xhr.status == 200) {
		getAllAppmnts()
		document.getElementById('new-appmnt-popup').style.display = 'none'
    } else {
        console.error(xhr.response)
    }
}

function getCookie(cname) {
	let name = cname + "="
	let decodedCookie = decodeURIComponent(document.cookie)
	let ca = decodedCookie.split(';')
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) == ' ') {
			c = c.substring(1)
	}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length)
		}
	}
	return undefined
  }