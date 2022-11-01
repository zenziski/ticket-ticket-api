const mongoose = require("mongoose");

const schema = mongoose.Schema({
   name: String,
   details: String,
   user: mongoose.Schema.Types.ObjectId
},
);

module.exports = mongoose.model("attraction", schema);