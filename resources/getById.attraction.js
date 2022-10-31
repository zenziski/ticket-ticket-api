const Auth = require('../middlewares/Auth')
const Permissions = require('../middlewares/Permissions')
module.exports = {
    http_method: "get",
    route: "/attraction/:id",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const Attraction = require('../models/Attraction');
        const idAttraction = req.params.id;

        if(!idAttraction) return res.status(400).json({message: "Necessário preencher o id na URL"})
        try {
            const attraction = await Attraction.findOne({_id: idAttraction}).lean();
            return res.json(attraction)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}