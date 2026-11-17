import { Router } from "express";
import { getPets, getPet, postPet, putPet, deletePet } from "../controllers/controller.js";

const petRoute = Router()

petRoute.get("/api/pet", getPets)
petRoute.get("/api/pet/:id", getPet)
petRoute.post("/api/pet", postPet)
petRoute.put("/api/pet/:id", putPet)
petRoute.delete("/api/pet/:id", deletePet)

export default petRoute