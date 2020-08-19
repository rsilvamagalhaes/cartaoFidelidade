const mongoose = require("mongoose");
const Venda = mongoose.model('Venda');
const Pessoa = mongoose.model('Pessoa');
const { ObjectID } = require('mongodb');
const { Object } = require('mongodb');

module.exports = {
    async teste(req, res) {
        console.log("Testando o sistema.");
        return res.json("Sucesso funcionando");
    },

    async buscar(req, res) {
        console.log("Buscando registros.");
        const { page = 1 } = req.query;
        const vendas = await Venda.paginate({}, { page, limit: 5 });
        return res.json(vendas);
    },

    //AJUSTAR PARA LEVAR EM CONSIDERAÇÃO A ESTRELA USADA
    async buscarEstrelaByTelefone(req, res) {
        console.log("Buscando estrela por telefone " + req.params.telefone);

        await Pessoa.find({ "telefone": req.params.telefone }, function (err, doc) {
            if (err) return handleError(err);
            let pessoa = new Pessoa();
            pessoa = doc[0];
            console.log(pessoa.id + " " + pessoa.nome + " encontrado.");
            Venda.find({ "cliente": pessoa.id}, function (err, doc1) {
                if (err) return handleError(err);
                let vendas = doc1;

                let soma = 0;
                let retorno = {};
                for (const key in vendas) {
                    console.info("key " + key);
                    let venda = vendas[key];
                    var estrela = venda.estrela;
                    var qtd = estrela.qtd;
                    soma += qtd;
                }
                
                pessoa["qtdEstrelas"] = soma;
                retorno.cliente = pessoa;
                retorno.venda = vendas;
                console.info("Quantidade de estrelas " + soma);

                console.log(vendas.length + " encontrados.");
                return res.json(retorno);
            });
        });
    },
    async buscarVendaByTelefone(req, res) {
        console.log("Buscando venda por telefone " + req.params.telefone);

        await Pessoa.find({ "telefone": req.params.telefone }, function (err, doc) {
            if (err) return handleError(err);
            let pessoa = new Pessoa();
            pessoa = doc[0];
            console.log(pessoa.id + " " + pessoa.nome + " encontrado.");
            Venda.find({ "cliente": pessoa.id }, function (err, doc1) {
                if (err) return handleError(err);
                let vendas = doc1;
                console.log(vendas.length + " encontrados.");
                return res.json(vendas);
            });
        });
    },

    async buscarById(req, res) {
        console.log("Buscando por idVEnda " + req.params.idVenda);
        const { page = 1 } = req.query;
        const vendas = await Venda.paginate({ _id: req.params.idVenda }, {});
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

            if (reqVenda.idCliente) {
                Pessoa.updateOne({ _id: pessoa._id }, pessoa, function (err) {
                    if (err) return console.error("Deu erro aqui -->> \n" + err);
                    console.log(pessoa._id + " " + pessoa.nome + " atualiza.");
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
            if (reqVenda.idCliente) {
                Pessoa.updateOne({ _id: pessoa._id }, pessoa, function (err) {
                    if (err) return console.error("Deu erro aqui -->> \n" + err);
                    console.log(pessoa._id + " " + pessoa.nome + " atualiza.");
                });
            } else {
                pessoa.save(function (err) {
                    if (err) return console.error("Deu erro aqui -->> \n" + err);
                    console.log(pessoa._id + " " + pessoa.nome + " Salvo com sucesso.");
                });
            }

            console.info("Atualizar " + JSON.stringify(venda));
            venda._id = new ObjectID(req.params.id)
            Venda.updateOne({ _id: req.params.id }, venda, function (err) {
                if (err) return console.error("Deu erro aqui -->> \n" + err);
                console.log(req.params.id + " " + venda.vitrine + " Atualizado com sucesso.");
            });

            return res.json("venda1");
            // });
        }
    },

    async remover(req, res) {
        console.info("Removendo " + req.params.id);
        await Venda.findOneAndDelete(req.params.id, function (err) {
            if (err) return console.error("Deu erro aqui -->> \n" + err);
            console.log(req.params.id + " Deletado com sucesso.");
        });
        return res.send();
    }

};