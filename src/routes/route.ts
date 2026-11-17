import { Router } from "express";

const route = Router()
route.get("/", (_req, _res) => {
    _res.status(200).json({message: "oksa"})
})

export default route