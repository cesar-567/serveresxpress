import {model, Schema} from "mongoose";

const comandaSchema = new Schema({
    numero: {type:Number, required:true},
    mesa: {type: Schema.Types.ObjectId, ref: 'Mesas', required:true},
    pratos: [{type:Schema.Types.ObjectId, ref: 'Pratos'}]
})

const Comandas = model('Comandas', comandaSchema)

export {Comandas}