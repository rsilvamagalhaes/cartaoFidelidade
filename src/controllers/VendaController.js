const mongoose = require("mongoose");
const Venda =  mongoose.model('Venda');
const Pessoa =  mongoose.model('Pessoa'); 
const { ObjectID } = require('mongodb');

module.exports = {

    async buscar(req, res) {
        console.log("Buscando registros.");
        const {page = 1} = req.query;
        const vendas = await Venda.paginate({}, {page, limit : 5});
        return res.json(vendas);
    },

    async buscarByTelefone(req, res) {
        console.log("Buscando por telefone " + req.params.telefone);
        const {page = 1} = req.query;
        const vendas = await Venda.paginate({telefone : req.params.telefone}, {page, limit : 5});
        return res.json(vendas);
    },

    async buscarById(req, res) {
        console.log("Buscando por idVEnda " + req.params.idVenda);
        const {page = 1} = req.query;
        const vendas = await Venda.paginate({_id : req.params.idVenda}, {});
        return res.json(vendas);
    },

    async salvar(req, res) {
        console.info("Salvar")
        const reqVenda = req.body;
        if (reqVenda != null) {
            const venda = new Venda();
            const estrela = {};
            const pessoa = new Pessoa();
            console.info("Requisicao: " + JSON.stringify(reqVenda))

            pessoa._id = reqVenda.idCliente;
            pessoa.nome = reqVenda.nome;
            pessoa.telefone = reqVenda.telefone.replace(/\D/g, "");;

            var pesoEstrela = 0
            if (reqVenda.dobroEstrela) {
                console.info("Requisicao com dobro de estrelas");
                pesoEstrela = 37, 5
            } else {
                console.info("Requisicao sem dobro de estrelas");
                pesoEstrela = 75
            }

            if (reqVenda.valor != null && reqVenda.valor > 0) {
                estrela.qtd = reqVenda.valor / pesoEstrela;
                venda.valor = reqVenda.valor;
            }
            estrela.usado = false;
            estrela.quandoUsado = null;
            venda.dobro = reqVenda.dobroEstrela;
            venda.vitrine = reqVenda.vitrine;
            venda.estrela = estrela;
            venda.cliente = pessoa;

            console.log(venda._id + " " + venda.vitrine + " Preparado com sucesso.");
            console.info("Salvando " + JSON.stringify(pessoa));

            if (pessoa._id) {
                pessoa.updateOne({_id : pessoa._id}, function (err) {
                    if (err) return console.error("Deu erro aqui -->> \n" + err);
                    console.log(pessoa._id + " " + pessoa.nome + " Salvo com sucesso.");
                });
            } else {
                pessoa.save(function (err) {
                    if (err) return console.error("Deu erro aqui -->> \n" + err);
                    console.log(pessoa._id + " " + pessoa.nome + " Salvo com sucesso.");
                });
            }
            
            console.info("Salvando " + JSON.stringify(venda)); 
            venda.save(function (err) {
                if (err) return console.error("Deu erro aqui -->> \n" + err);
                console.log(venda._id + " " + venda.vitrine + " Salvo com sucesso.");
            });
 
            return res.json(venda); 
        }
    },
 
    async atualizar(req, res) {
        console.info("Atualizar " + req.params.id);
        const reqVenda = req.body;
        if (reqVenda != null) {
            
            // await Venda.findById(new ObjectID(req.params.id), function (err, venda) {
            const venda = new Venda();    
            const estrela = {};
            const pessoa = new Pessoa();
            console.info("Requisicao: " + JSON.stringify(reqVenda))

            // if (err) return console.error("Deu erro aqui -->> \n" + err);
            console.log("Find by id " + venda);                
            
            pessoa._id = reqVenda.idCliente;
            pessoa.nome = reqVenda.nome;
            pessoa.telefone = reqVenda.telefone.replace(/\D/g, "");;
            
            var pesoEstrela = 0
            if (reqVenda.dobroEstrela) {
                console.info("Requisicao com dobro de estrelas");
                pesoEstrela = 37, 5
            } else {
                console.info("Requisicao sem dobro de estrelas");
                pesoEstrela = 75
            }
            
            if (reqVenda.valor != null && reqVenda.valor > 0) {
                estrela.qtd = reqVenda.valor / pesoEstrela;
                venda.valor = reqVenda.valor;
            }
            estrela.usado = false;
            estrela.quandoUsado = null;
            venda.dobro = reqVenda.dobroEstrela;
            venda.vitrine = reqVenda.vitrine;
            venda.estrela = estrela;
            venda.cliente = pessoa;
            
            console.log(venda._id + " " + venda.vitrine + " Preparado com sucesso.");
            console.info("Atualizando " + JSON.stringify(pessoa));
            pessoa.updateOne({_id : pessoa._id}, function (err) {
                if (err) return console.error("Deu erro aqui -->> \n" + err);
                console.log(pessoa._id + " " + pessoa.nome + " Salvo com sucesso.");
            });
            
            console.info("Atualizar " + JSON.stringify(venda)); 
            venda._id = new ObjectID(req.params.id)
            Venda.updateOne({_id: req.params.id}, venda, function (err) {
                if (err) return console.error("Deu erro aqui -->> \n" + err);
                console.log(req.params.id + " " + venda.vitrine + " Atualizado com sucesso.");
            });
            
            return res.json("venda1");
            // });
        }
    },

    async remover(req, res) {
        await Venda.findOneAndDelete(req.params.id,function (err) {
            if (err) return console.error("Deu erro aqui -->> \n" + err);
            console.log(req.params.id + " Deletado com sucesso.");
        });
        return res.send();
    }
    
};