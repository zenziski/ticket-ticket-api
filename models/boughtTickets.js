const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    bought: [{
        ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'ticket' },
        quantity: Number,
        ticketCodes: []
    }]
},
);

module.exports = mongoose.model("boughtTicket", schema);