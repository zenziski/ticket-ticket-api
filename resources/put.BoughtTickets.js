const Auth = require('../middlewares/Auth');
const Permissions = require('../middlewares/Permissions');
module.exports = {
    http_method: "put",
    route: "/bought",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const boughtTicket = require('../models/boughtTickets');
        try {
            const tickets = await boughtTicket.updateOne({user: req.user._id}, {
                ...req.body
            })
            return res.json(tickets)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}