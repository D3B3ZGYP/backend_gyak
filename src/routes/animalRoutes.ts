import { Router } from "express";
import { getAnimals, getAnimal, postAnimal, patchAnimal, deleteAnimal } from "../controllers/controller.js";

const animalRoute = Router()

animalRoute.get("/api/animals", getAnimals)
animalRoute.get("/api/animals/:id", getAnimal)
animalRoute.post("/api/animals", postAnimal)
animalRoute.patch("/api/animals/:id", patchAnimal)
animalRoute.delete("/api/animals/:id", deleteAnimal)

export default animalRoute