const mongoose = require("mongoose");
const Estrelas =  mongoose.model('Estrelas'); 

module.exports = {
    async buscarBy(req, res) {
        console.log("Buscando por " + req.params.idVenda);
        const estrelas = await Estrelas.find({idVenda : req.params.idVenda});
        return res.json(estrelas);
    },
    async salvar(req, res) {
        const estrela = await Estrelas.create(req.body);
        return res.json(estrela); 
    },
}