const mongoose = require("mongoose");
const Venda =  mongoose.model('Venda'); 

module.exports = {
    
    async buscar(req, res) {
        console.log("Buscando registros.");
        const {page = 1} = req.query;
        const vendas = await Venda.paginate({}, {page, limit : 5});
        return res.json(vendas);
    },

    async buscarBy(req, res) {
        console.log("Buscando por " + req.params.telefone);
        const {page = 1} = req.query;
        const vendas = await Venda.paginate({telefone : req.params.telefone}, {page, limit : 5});
        return res.json(vendas);
    },

    async salvar(req, res) {
        const venda = await Venda.create(req.body);
        return res.json(venda); 
    },
 
    async atualizar(req, res) {
        const venda = await Venda.findByIdAndUpdate(req.params.id, req.body, {new : true});
        return res.json(venda); 
    },

    async remover(req, res) {
        await Venda.findByIdAndRemove(req.params.id);
        return res.send();
    }
    
}