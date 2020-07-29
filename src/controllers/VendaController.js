const mongoose = require("mongoose");
const Venda =  mongoose.model('Venda');
const Pessoa =  mongoose.model('Pessoa'); 

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
        const reqVenda = req.body;
        if (reqVenda != null) {
            let venda = {};
            //TODO ARRUMAR ISSO
            venda = await preparaObjetos(reqVenda)
                .then(
                    function(result){
                        console.log("Promise resolved: " + result);
                        return result;
                    })
                .catch(function(error){
                    console.log("Promise resolved: " + error);
                    return null;
                });
            
            console.log(venda._id + " " + venda.vitrine + " Preparado com sucesso.")
                
            // {
            //     if (err) return console.error("Deu erro aqui -->> \n" + err);
            //     console.log(vendaCallback._id + " " + vendaCallback.vitrine + " Preparado com sucesso.");
            //     venda = vendaCallback;
            // });
            const pessoa =  venda.cliente;

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

            if (venda._id) {
                venda.updateOne({_id: venda._id}, function (err) {
                    if (err) return console.error("Deu erro aqui -->> \n" + err);
                    console.log(venda._id + " " + venda.vitrine + " Salvo com sucesso.");
                });
            } else {
                venda.save(function (err) {
                    if (err) return console.error("Deu erro aqui -->> \n" + err);
                    console.log(venda._id + " " + venda.vitrine + " Salvo com sucesso.");
                });
            }

            return res.json(venda); 
        }
    },
 
    async atualizar(req, res) {
        const venda = await Venda.findByIdAndUpdate(req.params.id, req.body, {new : true});
        return res.json(venda); 
    },

    async remover(req, res) {
        await Venda.findOneAndDelete(req.params.id,function (err) {
            if (err) return console.error("Deu erro aqui -->> \n" + err);
            console.log(req.params.id + " Deletado com sucesso.");
        });
        return res.send();
    }
    
};

var preparaObjetos = async function(reqVenda) {
    //TODO VEJA SE ESTÁ CAINDO EM ALGUM ERRO AQUI   
    const promise = new Promise( (resolve, reject) => {
        try {
            const venda = new Venda();
            const estrela = {};
            const pessoa = new Pessoa();
            console.info("Requisicao: " + JSON.stringify(reqVenda))

            pessoa._id = reqVenda.idCliente;
            pessoa.nome = reqVenda.nome;
            pessoa.telefone = reqVenda.telefone.replace(/\D/g,"");;

            var pesoEstrela = 0
            if (reqVenda.dobroEstrela) {
                pesoEstrela = 37,5
            } else {
                pesoEstrela = 75
            }

            if (reqVenda.valor != null && reqVenda.valor > 0) {
                estrela.qtd = reqVenda.valor / pesoEstrela;
                venda.valor = reqVenda.valor;
            }

            estrela.usado=false;
            estrela.quandoUsado=null;

            venda._id = reqVenda.id;
            venda.dobro = reqVenda.dobroEstrela;
            venda.vitrine = reqVenda.vitrine;
            venda.estrela = estrela;
            
            venda.cliente = pessoa;
            resolve(venda);
        } catch(error) {
            console.error("Ocorreu um erro na preparacao " + error)
            reject(error);
        }
    });
    return promise;
};

//index.js
function soAceitaPares(numero){
    const promise = new Promise( (resolve, reject) => { 
                        if (numero % 2 === 0) { 
                            const resultado = 'Viva, é par!';
                            resolve(resultado);
                        } 
                        else { 
                            reject(new Error("Você passou um número ímpar!"));
                        } 
                    });
    return promise;
}