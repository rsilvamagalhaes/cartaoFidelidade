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
        default: Date.now,
    },
    descricao: {
        type : String
    },

});
EstrelaSchema.plugin(mongoosePaginate);
mongoose.model("Estrelas", EstrelaSchema);