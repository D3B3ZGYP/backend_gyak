import type { Request, Response } from "express"
import {Animal, IAnimal, AllatManager} from "../models/animal.js"

export const getAnimals = async (_req: Request, _res: Response) => {
    const allatManager = new AllatManager()
    _res.status(200).send(await allatManager.queryAllAnimals())
}

export const getAnimal = async (_req: Request, _res: Response) => {
    const allatManager = new AllatManager()
    const id = Number.parseInt(_req.params.id as string)

    const pet = await allatManager.queryAnimal(id)
    if (!pet)
        return _res.status(404).send("Az állat nem létezik")

    return _res.status(200).send(pet)
}

export const postAnimal = async (_req: Request, _res: Response) => {
    const animalManager = new AllatManager()
    const animal = new Animal(_req.body)

    if (!_req.body || !checkRequiredFields(_req.body as Partial<IAnimal>) || !animal.checkValidity())
        return _res.status(400).send("A megadott adatok nem megfelelőek")

    const id = await animalManager.insertAnimal(animal.toJSON())
    if (!id)
        return _res.status(500).send("Sikertelen hozzáadás")

    return _res.status(201).send(id)
}

export const patchAnimal = async (_req: Request, _res: Response) => {
    const id = Number.parseInt(_req.params.id as string)
    const allatManager = new AllatManager()

    const allat = await allatManager.queryAnimal(id)
    if (!allat)
        return _res.status(404).send("Az állat nem létezik")

    Object.assign(allat, _req.body)

    if (!_req.body || !checkFieldsAreRequired(_req.body as Partial<IAnimal>) || !new Animal(allat).checkValidity())
        return _res.status(400).send("A megadott adatok nem megfelelőek")

    const ujAllat = await allatManager.updateAnimal(allat, id)
    if (!ujAllat)
        return _res.status(500).send("Sikertelen módosítás")

    return _res.status(200).send("Sikeres módosítás")
}

export const deleteAnimal = async (_req: Request, _res: Response) => {
    const id = Number.parseInt(_req.params.id as string)
    const allatManager = new AllatManager()

    if (!await allatManager.queryAnimal(id))
        return _res.status(404).send("Az állat nem létezik")

    if (!await allatManager.deleteAnimal(id))
        return _res.status(500).send("Sikertelen törlés")

    return _res.status(204).send()
}

const checkRequiredFields = (obj: Partial<IAnimal>): boolean => {
    if (!obj)
        return false

    const requiredFields = Object.keys(new Animal({}).toJSON()).filter(key => key != "id")
    return requiredFields.every(key => obj.hasOwnProperty(key))
}

const checkFieldsAreRequired = (obj: Partial<IAnimal>): boolean => {
    if (!obj)
        return false

    const requiredFields = Object.keys(new Animal({}).toJSON()).filter(key => key != "id")
    return Object.keys(obj).every(key => requiredFields.includes(key))
}