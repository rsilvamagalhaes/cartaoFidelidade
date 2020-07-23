const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");


const Pessoa = new mongoose.Schema({
    telefone: { type: String, required: true},
    nome: { type: String, required: true},
});

const VendaSchema = new mongoose.Schema({
    pessoal: { type: Pessoa, required: true },
    estrela: { type: schema.Types.ObjectId, ref: 'Estrela' },
    descricao: { type: String, required: true },
    valor: {type: schema.Types.Number, required: true},
    createdAt: { type: Date, default: Date.now,}
});

VendaSchema.plugin(mongoosePaginate);

mongoose.model("Venda", VendaSchema);