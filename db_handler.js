const {Pool, types} = require("pg")

const db_pool = new Pool({connectionString: "postgresql://infoag:infoag@v2202111121097167229.goodsrv.de:5432/attendance_cal"})

async function createPersonInDB(name) {
    return db_pool.query("INSERT INTO person_list (name) VALUES ($1)", [name]).then(_ => {
        return "ok"
    }).catch(err => {
        throw err
    })
}

async function getAllPersonsFromDB() {
    return db_pool.query("SELECT * FROM person_list").then(res => {
        return res.rows
    }).catch(err => {
        throw err
    })
}

async function deletePersonInDB(id) {
    return db_pool.query("DELETE FROM person_list WHERE id = $1", [id]).then(_ => {
        return "ok"
    }).catch(err => {
        throw err
    })
}

async function getAllAppmntsFromDB() {
    return db_pool.query("SELECT * FROM appmnt_list").then(res => {
        return res.rows
    }).catch(err => {
        throw err
    })
}

async function removeAppointmentFromDB(id) {
    return db_pool.query("DELETE FROM appmnt_list WHERE id = $1", [id]).then(_ => {
        return "ok"
    }).catch(err => {
        throw err
    })
}

async function addAppmntToDB(date, end_date, name) {
    return db_pool.query("INSERT INTO appmnt_list (date, end_date, name) VALUES ($1, $2, $3)", [(new Date(date)).toISOString(), (new Date(end_date)).toISOString(), name]).then(_ => {
        return "ok"
    }).catch(err => {
        throw err
    })
}

async function addAttendanceToDB(user_id, appmnt_id) {
    return db_pool.query("INSERT INTO attendance_list (user_id, appmnt_id) VALUES ($1, $2)", [user_id, appmnt_id]).then(_ => {
        return "ok"
    }).catch(err => {
        throw err
    })
}

async function deleteAttendanceFromDB(user_id, appmnt_id) {
    return db_pool.query("DELETE FROM attendance_list WHERE user_id = $1 AND appmnt_id = $2", [user_id, appmnt_id]).then(_ => {
        return "ok"
    }).catch(err => {
        throw err
    })
}

module.exports = {
    getAllPersonsFromDB,
    createPersonInDB,
    deletePersonInDB,
    addAppmntToDB,
    addAttendanceToDB,
    deleteAttendanceFromDB,
    getAllAppmntsFromDB,
    removeAppointmentFromDB
}