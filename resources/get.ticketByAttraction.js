module.exports = {
    http_method: "get",
    route: "/ticket-attraction/:attraction",
    middleware: [],
    handler: async (req, res) => {
        const Ticket = require('../models/Ticket');
        const {attraction} = req.params;
        if(!attraction) return res.status(400).json({message: "Necessário preencher o id na URL"})
        try {
            const ticket = await Ticket.find({attraction: attraction}).lean();
            return res.json(ticket)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}