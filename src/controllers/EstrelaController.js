const mongoose = require("mongoose");
const Estrelas =  mongoose.model('Estrelas'); 

module.exports = {

    async salvar(req, res) {
        console.log("Salvando estrela ");
        const estrela = await Estrelas.create(req.body);
        return res.json(estrela); 
    },
    async buscarDetalheEstrela(req, res) {
        console.log("Buscando por " + req.params.idVenda);
        const estrelas = await Estrelas.find();
        return res.json(estrelas);
    },
    async buscarTotal(req, res) {
        console.log("Buscando por " + req.params.idVenda);
        const estrelas = await Estrelas.find();

        //Soma o total de estrelas
        totalEstrela = estrelas.reduce(function(valor, estrela){
            return valor + estrela.qtd;
        }, 0);

        return res.json({totalEstrela : totalEstrela});
    },
}