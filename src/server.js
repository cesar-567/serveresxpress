import express from "express"
import mongoose from "mongoose"
import {Roupas} from "./models/roupas.js"
import {Mesas} from "./models/mesas.js"
import { Comandas } from "./models/comanda.js"
const app = express()
app.use(express.json())



app.get('/Mesas', async (req, res) => {
    const response = await Mesas.find()
    res.json(response)
})

app.get('/comandas', async (req, res) => {
    const response = await Comandas.find()
    res.json(response)
})

app.post('/Mesas', (req, res) => {
    const {numero} = req.body
    if(!numero){
        res.status(422).json({
            erro: true,
            message: "Dados inválidos"
        })
        return
    }
    const mesa = new Mesas({
        numero
    })
    mesa.save().then(
        () => res.status(201).json({
            erro: false,
            message: "Mesa criado com sucesso",
            mesa: mesa
        })).catch(
            () =>
            res.status(422).json({
            erro: true,
            message: "Dados inválidos"
            
        })
    )
})

app.post("/comandas", (req, res) => {
    const {numero, mesa, pratos} = req.body
    if(!numero, !mesa){
        return res.status(422).json({
            erro: true,
            message: "Dados inválidos"
        })
    }
    const comanda = new Comandas({numero, mesa, pratos})
    comanda.save().then(
        () => res.status(201).json({
            erro: false,
            message: "Criado com sucesso"
        })
    ).catch(
        () =>
            res.status(422).json({
            erro: true,
            message: "Dados inválidos"
        })
    )
})  

app.put("/comandas/:id/pratos", async (req, res) => {
    const {id} = req.params
    const {pratos} = req.body
    const comanda = await Comandas.findByIdAndUpdate(id, {$addToSet: {pratos}})
    if (comanda){
        return res.json({
            erro: false,
            message: "prato adiconado"
        })
    }else{
            res.json({
                erro: true,
                message: "prato não foi adicionado"
            })
        }
})



app.put('/Mesas/:id', async (req, res) => {
    const {id} = req.params
    const {numero} = req.body
    const response = await Mesas.findByIdAndUpdate(id, {numero})
    if(response){
        res.json({
            erro: false,
            message: "Alteração feita"
        })
    }else(
        res.json({
            erro: true,
            message: "Alteração não feita"
        })
    )
})

app.delete('/Mesas/:id', async (req, res) => {
    const {id} = req.params
    const response = await Mesas.findByIdAndDelete(id)
    if(response){
        res.json({
            erro: false,
            message: "Mesa apagado"
        })
    }else(
        res.json({
            erro: true,
            message: "Mesa não apagada"
        })
    )
})

app.delete('/comandas/:id', async (req, res) => {
    const {id} = req.params
    const response = await Comandas.findByIdAndDelete(id)
    if(response){
        res.json({
            erro: false,
            message: "Comanda apagada"
        })
    }else(
        res.json({
            erro: true,
            message: "Comanda não apagada"
        })
    )
})
//mongodb://localhost:27017

mongoose.connect("mongodb://localhost:27017/projeto")
.then(()=>console.log("conectado ao mongodb"))
.catch((err) => console.log("Erro ao conextar ao mongodb"))

app.listen(3333, () => {
    console.log("servidor rodando na porta 3333")
})