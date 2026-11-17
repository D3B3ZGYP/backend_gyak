import express, {urlencoded} from "express";
import cors from "cors";
import route from "../routes/route.js";

const app = express()
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors({origin: "*"}))
app.use(route)

export default app