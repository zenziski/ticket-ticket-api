const Auth = require('../middlewares/Auth')
const Permissions = require('../middlewares/Permissions')
module.exports = {
    http_method: "post",
    route: "/attraction",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const Attraction = require('../models/Attraction');
        const userId = req.user.id;
        const { name, details } = req.body;

        try {
            const createdAttraction = await Attraction.create({
                name,
                details,
                user: userId
            })
            return res.json({ message: "Criado com sucesso!", attraction: createdAttraction });
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}