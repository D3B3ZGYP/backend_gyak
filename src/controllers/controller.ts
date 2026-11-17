import type { Request, Response } from "express"
import { PetManager } from "../models/pet.js"

export const getPets = async (_req: Request, _res: Response) => {
    const petManager = new PetManager()
    _res.status(200).send(await petManager.queryAllPets())
}

export const getPet = (_req: Request, _res: Response) => {
    
}

export const postPet = (_req: Request, _res: Response) => {
    
}

export const putPet = (_req: Request, _res: Response) => {
    
}

export const deletePet = (_req: Request, _res: Response) => {
    
}