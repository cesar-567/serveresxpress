import { Router } from "express";
const pratosRouter = Router()

pratosRouter.get('/Roupas', async (req, res) => {
    const response = await Roupas.find()
    res.json(response)
})

pratosRouter.get('Roupas/:id', async (req, res) => {
    const {id} = req.params
    const response = await Roupas.findById(id)
    res.json(response)
})

pratosRouter.post('/Roupas', (req, res) => {
    const {nome, preco, marca, tamanho} = req.body
    if(!nome || !preco || !marca || !tamanho){
        res.status(422).json({
            erro: true,
            message: "Dados inválidos"
        })
        return
    }
    const roupas = new Roupas({
        nome, preco, marca, tamanho
    })
    roupas.save().then(
        () => res.status(201).json({
            erro: false,
            message: "Roupa registrada com sucesso",
            roupas: roupas
        })).catch(
            () =>
            res.status(422).json({
            erro: true,
            message: "Dados inválidos"
            
        })
    )
})

pratosRouter.put('/Roupas/:id', async (req, res) => {
    const {id} = req.params
    const {nome, preco, marca, tamanho} = req.body
    const response = await Roupas.findByIdAndUpdate(id, {preco})
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

pratosRouter.delete('/Roupas/:id', async (req, res) => {
    const {id} = req.params
    const response = await Roupas.findByIdAndDelete(id)
    if(response){
        res.json({
            erro: false,
            message: "Roupa apagada"
        })
    }else(
        res.json({
            erro: true,
            message: "Apagamento não realizado"
        })
    )
})

export { pratosRouter}