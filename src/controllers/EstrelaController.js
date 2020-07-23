const mongoose = require("mongoose");
const Estrela =  mongoose.model('Estrela'); 

module.exports = {

    async salvar(req, res) {
        console.log("Salvando estrela ");
        const estrela = await Estrela.create(req.body);
        return res.json(estrela); 
    },
    async buscarDetalheEstrela(req, res) {
        console.log("Buscando por " + req.params.idVenda);
        const estrela = await Estrela.find();
        return res.json(estrela);
    },
    async buscarTotal(req, res) {
        console.log("Buscando por " + req.params.idVenda);
        const estrela = await Estrela.find();

        //Soma o total de estrela
        totalEstrela = estrela.reduce(function(valor, estrela){
            return valor + estrela.qtd;
        }, 0);

        return res.json({totalEstrela : totalEstrela});
    },
}