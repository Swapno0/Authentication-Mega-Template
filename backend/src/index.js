import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import {app} from "./app.js"
import {Pool} from "pg"


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
})

const dbconnection = async() => {
    try {
        // const client = await pool.connect()
        console.log('Database Connected Successfully')
        // client.release()
    } catch (error) {
        console.log('Database Connection Failed.')
        process.exit(1)
    }
}
dbconnection()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server Running at port : ${process.env.PORT}`)
    })
})
.catch(err => {
    console.log('PostGreSQL DB connection failed', err)
})





export {pool}
// Remember to use correct schema name for database queries. Otherwise, public schema will get populated instead of the schema you desire.