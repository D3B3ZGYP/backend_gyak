import { dbExecute, dbQuery } from "../db.js"

export interface IPet{
    id: number,
    nev: string,
    leiras: string,
    ar: number,
    raktaron: number,
    kep: string
}

export class Pet implements IPet{
    private _id: number
    private _nev: string
    private _leiras: string
    private _ar: number
    private _raktaron: number
    private _kep: string

    constructor(obj: IPet){
        this._id = obj.id ?? 0
        this._nev = obj.nev ?? ""
        this._leiras = obj.leiras ?? ""
        this._ar = obj.ar ?? 0
        this._raktaron = obj.raktaron ?? 0
        this._kep = obj.kep ?? ""
    }

    get id(): number{
        return this._id
    }
    get nev(): string{
        return this._nev
    }
    get leiras(): string{
        return this._leiras
    }
    get ar(): number{
        return this._ar
    }
    get raktaron(): number{
        return this._raktaron
    }
    get kep(): string{
        return this._kep
    }

    set id(val: number){
        this._id = val
    }
    set nev(val: string){
        this._nev = val
    }
    set leiras(val: string){
        this._leiras = val
    }
    set ar(val: number){
        this._ar = val
    }
    set raktaron(val: number){
        this._raktaron = val
    }
    set kep(val: string){
        this._kep = val
    }

    toJSON(): IPet{
        return{
            id: this._id,
            nev: this._nev,
            leiras: this._leiras,
            ar: this._ar,
            raktaron: this._raktaron,
            kep: this._kep
        }
    }
}

export class PetManager{
    public async queryAllPets(): Promise<IPet[]>{
        try{
            const result = await dbQuery("SELECT * FROM pet")
            console.log(result)
            return result as IPet[]
        } catch(error){
            console.log("HIBA: " + error)
            return []
        }
    }

    public async queryPet(id: number): Promise<IPet> | undefined{
        try{
            const result = await dbQuery("SELECT * FROM pet WHERE id = ?", id) as unknown as IPet[]
            console.log(result)
            return result[0]
        } catch(error){
            console.log("HIBA: " + error)
            return undefined
        }
    }
}