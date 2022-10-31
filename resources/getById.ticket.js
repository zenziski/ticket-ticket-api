module.exports = {
    http_method: "get",
    route: "/ticket/:id",
    middleware: [],
    handler: async (req, res) => {
        const Ticket = require('../models/Ticket');
        const idTicket = req.params.id
        if(!idTicket) return res.status(400).json({message: "Necessário preencher o id na URL"})
        try {
            const ticket = await Ticket.findOne({_id: idTicket}).lean();
            return res.json(ticket)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}