const Auth = require('../middlewares/Auth')
const Permissions = require('../middlewares/Permissions')
module.exports = {
    http_method: "put",
    route: "/ticket/:id",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const Ticket = require('../models/Ticket');
        const { id } = req.params

        if (!id) return res.status(400).json({ message: "É necessário preencher o id" });

        try {
            await Ticket.updateOne({ _id: id }, {
                $set: {
                    ...req.body
                }
            })

            return res.json({ updated: true });
        } catch (error) {
            return res.status(400).json({ updated: false, error })
        }
    }
}