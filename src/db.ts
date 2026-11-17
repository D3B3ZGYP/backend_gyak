import mysql, {QueryResult, type ResultSetHeader} from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const config = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "jelszo",
    database: process.env.DB_NAME || "kisallat"
}

export async function dbExecute(query: string, ...params: any[]): Promise<ResultSetHeader>{
    const conn = await mysql.createConnection(config)
    const [result] = await conn.execute<ResultSetHeader>(query, params)
    await conn.end()

    return result
}

export async function dbQuery(query: string, ...params: any[]): Promise<QueryResult>{
    const conn = await mysql.createConnection(config)
    const [result] = await conn.query(query, ...params)
    await conn.end()

    return result
}