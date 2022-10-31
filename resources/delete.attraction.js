const Auth = require('../middlewares/Auth')
const Permissions = require('../middlewares/Permissions')
module.exports = {
    http_method: "delete",
    route: "/attraction/:id",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const Attraction = require('../models/Attraction');
        const {id} = req.params;
        try {
            await Attraction.deleteOne({_id: id})
            return res.json({deleted: true})
        } catch (error) {
            return res.status(400).json({deleted: false, error})
        }
    }
}