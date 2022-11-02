const Auth = require('../middlewares/Auth')
module.exports = {
    http_method: "put",
    route: "/buyticket/:ticketId",
    middleware: [Auth],
    handler: async (req, res) => {
        const Ticket = require('../models/Ticket');
        const boughtTickets = require('../models/boughtTickets');
        const { ticketId } = req.params;
        const userId = req.user._id
        const { quantity } = req.body; //quantidade de ingressos que será comprada

        if (!ticketId) return res.status(400).json({ message: "É necessário preencher o ticketId" });

        try {

            const ticket = await Ticket.findOne({ _id: ticketId }).lean();
            if (!ticket) return res.status(400).json({ message: "Não foi encontrado nenhum ticket" });
            if (!ticket.active) return res.status(400).json({ message: "Ingresso desabilitado" });

            if ((ticket.limited.active && ticket.limited?.quantity < quantity) || ticket.quantity < quantity) {
                return res.status(400).json({ message: "Quantidade de ingressos maior que a permitida" });
            }

            let ticketCodes = [];
            const alreadyBought = await boughtTickets.findOne({ $and: [{ user: userId }, { 'bought.ticketId': ticketId }] }).lean(); // acha no banco de já foi 
                                                                                                                                    //  comprado o ingresso em especifico
            if (alreadyBought) {
                let quantity_bought = alreadyBought.bought.reduce((acc, it) => {
                    return acc + it.quantity;
                }, 0);

                if (ticket.limited.active && ticket.limited?.quantity < quantity_bought) {
                    return res.status(400).json({ message: "Quantidade de ingressos maior que a permitida" })
                }

            }
            for (let i = 0; i < quantity; i++) {
                let randomNum = Math.ceil(Math.random() * 10000000);
                ticketCodes.push(randomNum)
            }
            let newQuantity = ticket.quantity - quantity;

            await Ticket.updateOne({ _id: ticketId }, {
                $set: {
                    quantity: newQuantity,
                    active: newQuantity === 0 ? false : true //se a nova quantidade apos a compra for igual a zero, o ingresso é desativado para compra
                }
            })

            await boughtTickets.findOneAndUpdate({ user: userId }, {
                user: userId,
                $push: {
                    bought: {
                        ticketId: ticketId,
                        quantity,
                        ticketCodes
                    }
                }
            }, { upsert: true }) //upsert serve para caso não exista o registro no banco, seja criado um novo.

            return res.json({ message: "Compra finalizada com sucesso!", ticketCodes });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Quantidade de ingressos maior que a permitida' });
        }
    }
}