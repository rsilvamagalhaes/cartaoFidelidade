const express = require("express");
const routes = express.Router();

const VendaController = require("./controllers/VendaController");
const EstrelaController = require("./controllers/EstrelaController");

routes.get('/venda/telefone/:telefone', VendaController.buscarByTelefone);
routes.get('/venda/:idVenda', VendaController.buscarById);
routes.get('/venda', VendaController.buscar);
routes.post('/venda', VendaController.salvar);
routes.put('/venda/:id', VendaController.atualizar);
routes.delete('/venda/:id', VendaController.remover);

routes.get('/estrela/:idVenda/detalhe', EstrelaController.buscarDetalheEstrela);
routes.get('/estrela/:idVenda', EstrelaController.buscarTotal);
routes.post('/estrela', EstrelaController.salvar);

module.exports = routes;
