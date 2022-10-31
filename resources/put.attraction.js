const Auth = require('../middlewares/Auth')
const Permissions = require('../middlewares/Permissions')
module.exports = {
    http_method: "put",
    route: "/attraction/:id",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const Attraction = require('../models/Attraction');
        const { id } = req.params

        if (!id) return res.status(400).json({ message: "É necessário preencher o id" });

        try {
            await Attraction.updateOne({ _id: id }, {
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