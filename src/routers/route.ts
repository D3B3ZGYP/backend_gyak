import {Router} from "express"

const route = new Router()

route.get("/", (req, res) => {
    res.status(200).json({message:"Szerver fut"})
})

export default route