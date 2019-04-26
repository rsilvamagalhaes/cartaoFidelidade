const express = require("express");
const routes = express.Router();

const VendaController = require("./controllers/VendaController");
const EstrelaController = require("./controllers/EstrelaController");

routes.get("/venda/:telefone", VendaController.buscarBy);
routes.get("/venda", VendaController.buscar);
routes.post('/venda', VendaController.salvar);
routes.put('/venda/:id', VendaController.atualizar);
routes.delete('/venda/:id', VendaController.remover);

routes.get("/estrela", EstrelaController.buscar);
routes.post('/estrela', EstrelaController.salvar);


module.exports = routes;
