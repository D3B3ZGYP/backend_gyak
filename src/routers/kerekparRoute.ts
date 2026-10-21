import {Router} from "express"
import {getBicycles, getBicycle, postBicycle, patchBicycle, deleteBicycle} from "../controllers/controller.ts"

const kerekparRoute = new Router()

kerekparRoute.get("/api/bicycle", getBicycles)
kerekparRoute.get("/api/bicycle/:id", getBicycle)
kerekparRoute.post("/api/bicycle", postBicycle)
kerekparRoute.patch("/api/bicycle/:id", patchBicycle)
kerekparRoute.delete("/api/bicycle/:id", deleteBicycle)

export default kerekparRoute