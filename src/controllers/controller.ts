import data from "../kerekpar.ts"
import {BicycleManager, type IBicycle, Bicycle} from "./bicycle.ts";

const bicycleManager = new BicycleManager(data)

export const getBicycle = (req, res) => {
    const {id} = req.params
    const bicycle = bicycleManager.getBicycleById(Number.parseInt(id))

    if (bicycle)
        return res.status(200).json(bicycle.toJSON())
    else
        return res.status(404).json({message : "Az elem nem létezik"})
}

export const getBicycles = (req, res) => {
    return res.status(200).json(bicycleManager.getBicyclesObject())
}

export const postBicycle = (req : Request, res) => {
    const newBicycleObject = req.body as Partial<IBicycle>

    if (!checkFields(newBicycleObject, false))
        return res.status(400).json({message : "Az adatok nem megfelelőek"})

    const bicycle = bicycleManager.createBicycle(newBicycleObject as IBicycle)

    return res.status(201).json(bicycle.toJSON())
}

export const patchBicycle = (req, res) => {
    const {id} = req.params
    const bicycleData = req.body as Partial<IBicycle>

    if (!checkFields(bicycleData, false))
        return res.status(400).send("Az adatok nem megfelelőek")

    const bicycle = bicycleManager.updateBicycle(Number.parseInt(id), bicycleData as Omit<IBicycle, "id">)

    if (!bicycle)
        return res.status(404).send("Az elem nem létezik")

    return res.status(200).send("Sikeres módosítás")
}

export const deleteBicycle = (req, res) => {
    const {id} = req.params

    if (bicycleManager.deleteBicycle(Number.parseInt(id)))
        return res.status(204).send()

    return res.status(404).send("A kerékpár nem létezik")
}
const checkFields = (data: Partial<IBicycle>, needsId: boolean): boolean => {
    if (!data)
        return false

    const requiredFields = Object.keys(new Bicycle().toJSON()).filter(key => needsId ? true : key !== "id")
    console.log(requiredFields)
    return requiredFields.every(key => data.hasOwnProperty(key))
}