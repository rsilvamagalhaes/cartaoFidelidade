const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
const timeZone = require('mongoose-timezone');

const EstrelaSchema = new mongoose.Schema({ 
    qtd: {type : schema.Types.Number, required: true, },
    usado: {type : schema.Types.Number, required: true, },
    quandoUsado: { type: Date, default: Date.now, },
    createdAt: { type: Date, default: Date.now, },
});

EstrelaSchema.plugin(timeZone);
EstrelaSchema.plugin(mongoosePaginate);
mongoose.model("Estrela", EstrelaSchema);