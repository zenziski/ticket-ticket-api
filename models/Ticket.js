const mongoose = require("mongoose");

const schema = mongoose.Schema({
   name: String,
   cost: Number,
   quantity: Number,
   limited: {
      active: {type: Boolean, default: false},
      quantity: Number
   },
   active: {type: Boolean, default: true},
   user: mongoose.Schema.Types.ObjectId,
   attraction: String
},
);

module.exports = mongoose.model("ticket", schema);