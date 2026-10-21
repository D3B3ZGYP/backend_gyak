export interface IBicycle{
    id: number,
    nev: string,
    leiras: string,
    ar: number,
    raktaron: number,
    kep: string
}

export class Bicycle implements IBicycle{
    private _id: number
    private _nev: string
    private _leiras: string
    private _ar: number
    private _raktaron: number
    private _kep: string

    constructor(bicycle: Partial<IBicycle> = {}) {
        this._id = bicycle.id ?? 0
        this._nev = bicycle.nev ?? ""
        this._leiras= bicycle.leiras ?? ""
        this._ar = bicycle.ar ?? 0
        this._raktaron = bicycle.raktaron ?? 0
        this._kep = bicycle.kep ?? ""
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

    set id(value: number){
        this._id = value
    }
    set nev(value: string){
        this._nev = value
    }
    set leiras(value: string){
        this._leiras = value
    }
    set ar(value: number){
        this._ar = value
    }
    set raktaron(value: number){
        this._raktaron = value
    }
    set kep(value: string){
        this._kep = value
    }

    toJSON(): IBicycle{
        return {
            id: this._id,
            nev: this._nev,
            leiras: this._leiras,
            ar: this._ar,
            raktaron: this._raktaron,
            kep: this._kep
        }
    }
}

export class BicycleManager{
    private _bicycles : Bicycle[]

    constructor(initialData: IBicycle[]) {
        this._bicycles = initialData.map(b => new Bicycle(b))
    }

    getBicyclesObject(): IBicycle[]{
        return this._bicycles.map(b => b.toJSON())
    }

    getBicycleById(id: number): Bicycle | undefined{
        return this._bicycles.find(b => b.id === id)
    }

    createBicycle(bicycleObject: Omit<IBicycle, "id">): Bicycle{
        const newId = this._bicycles.reduce((max, current) => Math.max(max, current.id), 0) + 1
        const newBicycle = new Bicycle({...bicycleObject, id: newId})
        this._bicycles.push(newBicycle)

        return newBicycle
    }

    updateBicycle(id: number, bicycleObject: Omit<IBicycle, "id">): Bicycle | false{
        const bicycle = this.getBicycleById(id)
        if (!bicycle)
            return false

        Object.keys(bicycleObject).forEach(key => {
            if (bicycle.toJSON().hasOwnProperty(key))
                bicycle[key] = bicycleObject[key]
        })

        return bicycle
    }

    deleteBicycle(id: number): boolean{
        const index = this._bicycles.findIndex(b => b.id === id)
        if (index == -1)
            return false

        this._bicycles.splice(index, 1)
        return true
    }
}