const Auth = require('../middlewares/Auth')
const Permissions = require('../middlewares/Permissions')
module.exports = {
    http_method: "get",
    route: "/attractions",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const Attraction = require('../models/Attraction');
        try {
            const attractions = await Attraction.find({}).lean();
            return res.json(attractions)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}