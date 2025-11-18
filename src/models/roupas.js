import {model, Schema} from "mongoose";

const roupasSchema = new Schema({
    nome: {type: String, required:true},
    preco:{type: Number, required:true},
    marca:{type: String, required: true},
    tamanho:{type: String, required: true}
})

const Roupas = model('Roupas', roupasSchema)

export {Roupas}