const TransaRepo = require("../../domains/Transaction").TransactionRepository

module.exports = class extends TransaRepo {
    constructor(trans, order, ticket, event, location) {
        super();
        this.trans = trans
        this.order = order
        this.ticket = ticket
        this.event = event
        this.location = location
    }

    async createTransaction(body, t) {
        return this.trans.create(body, {
            transaction: t
        })
    }

    async getTransactionByID(id) {
        return this.trans.findOne({
            where: {
                id_transaction: id
            },
            include: {
                model: this.order,
                include: {
                    model: this.ticket,
                    include: {
                        model: this.event,
                        include: {
                            model: this.location
                        }
                    }
                }
            }
        })
    }
}