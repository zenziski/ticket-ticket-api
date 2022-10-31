const Auth = require('../middlewares/Auth')
const Permissions = require('../middlewares/Permissions')
module.exports = {
    http_method: "post",
    route: "/ticket",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const Ticket = require('../models/Ticket');
        const userId = req.user.id;

        const { name, cost, quantity, limited, attraction } = req.body;

        if (!name || !cost || !quantity || !attraction) return res.status(400).json({ message: "É necessário preencher todos os dados" });

        try {
            const createdTicket = await Ticket.create({
                name,
                cost,
                quantity,
                limited,
                user: userId,
                attraction
            });

            return res.json({ message: "Criado com sucesso!", ticket: createdTicket });
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}