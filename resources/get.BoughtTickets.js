const Auth = require('../middlewares/Auth');

module.exports = {
    http_method: "get",
    route: "/bought",
    middleware: [Auth],
    handler: async (req, res) => {
        const boughtTicket = require('../models/boughtTickets');
        try {
            const tickets = await boughtTicket.findOne({user: req.user._id}).lean();
            if(!tickets) return res.status(404).json({message: "Não foi encontrado nenhuma compra."})
            return res.json(tickets)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}