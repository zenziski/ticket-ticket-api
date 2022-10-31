const Auth = require('../middlewares/Auth')
const Permissions = require('../middlewares/Permissions')
module.exports = {
    http_method: "delete",
    route: "/ticket/:id",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const Ticket = require('../models/Ticket');
        const {id} = req.params;
        try {
            await Ticket.deleteOne({_id: id})
            return res.json({deleted: true})
        } catch (error) {
            return res.status(400).json({deleted: false, error})
        }
    }
}