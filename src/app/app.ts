import express, {urlencoded} from "express";
import cors from "cors";
import route from "../routes/routes.js";
import animalRoute from "../routes/animalRoutes.js";

const app = express()
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors({origin: "*"}))
app.use(route)
app.use(animalRoute)

export default app