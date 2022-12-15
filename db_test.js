const {Pool, types} = require("pg")

const db_pool = new Pool({connectionString: "postgresql://infoag:infoag@v2202111121097167229.goodsrv.de:5432/attendance_cal"})

db_pool.query("SELECT * FROM person_list").then(res => {
    console.log(res.rows)
})
console.log("test")
