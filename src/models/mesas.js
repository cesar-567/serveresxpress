import {model, Schema} from "mongoose";

const mesasSchema = new Schema({
    numero: {type: Number, required:true},
})

const Mesas = model('Mesas', mesasSchema)

export {Mesas}