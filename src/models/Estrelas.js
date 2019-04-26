const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

const EstrelaSchema = new mongoose.Schema({
    _idVenda: {
        type : String,
        required: true,
    }, 
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

});
mongoose.model("Estrelas", EstrelaSchema);