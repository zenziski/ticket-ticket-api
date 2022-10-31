const Auth = require('../middlewares/Auth')
module.exports = {
    http_method: "put",
    route: "/buyticket/:id",
    middleware: [Auth],
    handler: async (req, res) => {
        const Ticket = require('../models/Ticket');
        const { id } = req.params
        const { quantity } = req.body //quantidade de ingressos que será comprada

        if (!id) return res.status(400).json({ message: "É necessário preencher o id" });

        try {

            const ticket = await Ticket.findOne({_id: id}).lean();

            if((ticket.limited.active && ticket.limited.quantity < quantity) || ticket.quantity < quantity){
                return res.status(400).json({ message: "Quantidade de ingressos maior que a permitida" });
            }
            let newQuantity = ticket.quantity - quantity;
             
            await Ticket.updateOne({ _id: id }, {
                $set: {
                    quantity: newQuantity,
                    active: newQuantity === 0 ? false : true //se a nova quantidade apos a compra for igual a zero, o ingresso é desativado para compra
                }
            })

            return res.json({ updated: true });
        } catch (error) {
            return res.status(400).json({ updated: false, error })
        }
    }
}