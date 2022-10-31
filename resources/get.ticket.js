module.exports = {
    http_method: "get",
    route: "/tickets",
    middleware: [],
    handler: async (req, res) => {
        const Ticket = require('../models/Ticket');
        try {
            const tickets = await Ticket.find({active: true}).lean();
            return res.json(tickets)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}