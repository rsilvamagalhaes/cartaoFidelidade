const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

const VendaSchema = new mongoose.Schema({
    telefone: {
        type : String,
        required: true
    },
    nome: {
        type : String,
        required: true
    },
    descricao: {
        type : String,
        required: true
    },
    valor: {
        type : schema.Types.Number,
        required: true,
    },
    estrelas: [{
        qtd: {
            type : schema.Types.Number,
            required: true,
        },
        createdAt: {
            type: Date,
        },
        descricao: {
            type : String
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

VendaSchema.plugin(mongoosePaginate);

mongoose.model("Venda", VendaSchema);