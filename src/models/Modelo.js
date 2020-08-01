const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

const Pessoa = new mongoose.Schema({
    telefone: { type: String, required: true},
    nome: { type: String, required: true},
});
mongoose.model("Pessoa", Pessoa);

const Estrela = new mongoose.Schema({ 
    qtd: {type : schema.Types.Number, required: true, },
    usado: {type : schema.Types.Boolean, required: true, },
    quandoUsado: { type: Date, default: Date.now, },
    createdAt: { type: Date, default: Date.now, },
});

const VendaSchema = new mongoose.Schema({
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa'},
    estrela: { type: Estrela, required: true },
    vitrine: { type: String, required: true },
    descricao: { type: String, required: false },
    valor: {type: schema.Types.Number, required: true},
    dobro: {type: schema.Types.Boolean, required: true},
    createdAt: { type: Date, default: Date.now,}
});

VendaSchema.plugin(mongoosePaginate);

mongoose.model("Venda", VendaSchema);