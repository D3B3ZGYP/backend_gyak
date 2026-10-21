import express, {urlencoded} from "express"
import cors from "cors"
import route from "../routers/route.ts"
import kerekparRoute from "../routers/kerekparRoute.ts";

const app = new express()
app.use(urlencoded({extended: true}))
app.use(express.json())
app.use(cors({origin:"*"}))
app.use(route)
app.use(kerekparRoute)

export default app