import { dbExecute, dbQuery } from "../db.js"
import {ResultSetHeader} from "mysql2/promise";

export interface IAnimal {
    id: number,
    nev: string,
    faj: string,
    kor: number,
    nem: "hím" | "nőstény" | "ismeretlen",
    orokbefogadhato: boolean,
    kep: string
}

export class Animal implements IAnimal{
    private _id: number
    private _nev: string
    private _faj: string
    private _kor: number
    private _nem: "hím" | "nőstény" | "ismeretlen"
    private _orokbefogadhato: boolean
    private _kep: string

    constructor(obj: Partial<IAnimal>){
        this._id = obj.id ?? 0
        this._nev = obj.nev ?? ""
        this._faj = obj.faj ?? ""
        this._kor = obj.kor ?? 0
        this._nem = obj.nem ?? "ismeretlen"
        this._orokbefogadhato = obj.orokbefogadhato ?? false
        this._kep = obj.kep ?? ""
    }

    checkValidity(): boolean{
        return !((this._nem != "hím" && this._nem != "nőstény" && this._nem != "ismeretlen") || this._kor < 0)
    }

    get id(): number{
        return this._id
    }
    get nev(): string{
        return this._nev
    }
    get faj(): string{
        return this._faj
    }
    get kor(): number{
        return this._kor
    }
    get nem(): "hím" | "nőstény" | "ismeretlen"{
        return this._nem
    }
    get orokbefogadhato(): boolean{
        return this._orokbefogadhato
    }
    get kep(): string{
        return this._kep
    }

    set id(val: number){
        return this._id
    }
    set nev(val: string){
        return this._nev
    }
    set faj(val: string){
        return this._faj
    }
    set kor(val: number){
        return this._kor
    }
    set nem(val: "hím" | "nőstény" | "ismeretlen"){
        return this._nem
    }
    set orokbefogadhato(val: boolean){
        return this._orokbefogadhato
    }
    set kep(val: string){
        return this._kep
    }

    toJSON(): IAnimal{
        return{
            id: this._id,
            nev: this._nev,
            faj: this._faj,
            kor: this._kor,
            nem: this._nem,
            orokbefogadhato: this._orokbefogadhato,
            kep: this._kep
        }
    }
}

export class AllatManager {
    public async queryAllAnimals(): Promise<IAnimal[]>{
        try{
            const result = await dbQuery("SELECT * FROM allat")
            return result as IAnimal[]
        } catch(error){
            console.log("HIBA: " + error)
            return []
        }
    }

    public async queryAnimal(id: number): Promise<IAnimal | undefined>{
        try{
            const result = await dbQuery("SELECT * FROM allat WHERE id = ?", id) as unknown as IAnimal[]
            return result[0]
        } catch(error){
            console.log("HIBA: " + error)
            return undefined
        }
    }

    public async insertAnimal(obj: Partial<IAnimal>): Promise<number | undefined>{
        try{
            const result = await dbQuery("INSERT INTO allat (nev, faj, kor, nem, orokbefogadhato, kep) VALUES(?, ?, ?, ?, ?, ?);",
                [obj.nev, obj.faj, obj.kor, obj.nem, obj.orokbefogadhato, obj.kep]) as ResultSetHeader
            return result.insertId
        } catch(error){
            console.log("HIBA: " + error)
            return undefined
        }
    }

    public async updateAnimal(obj: Partial<IAnimal>, id: number): Promise<IAnimal | undefined>{
        try{
            const result = await dbQuery("UPDATE allat SET ? WHERE id = ?",
                [obj, id])
            return await this.queryAnimal(id)
        } catch(error){
            console.log("HIBA: " + error)
            return undefined
        }
    }

    public async deleteAnimal(id: number): Promise<boolean>{
        try{
            const result = await dbQuery("DELETE FROM allat WHERE id = ?",
                [id])
            return true
        } catch(error){
            console.log("HIBA: " + error)
            return false
        }
    }
}