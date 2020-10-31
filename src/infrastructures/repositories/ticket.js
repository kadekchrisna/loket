const TicketRepository = require("../../domains/Ticket").TicketRepository

module.exports = class extends TicketRepository{
    constructor(ticket) {
        super();
        this.Ticket = ticket
    }
    async getTicketByID(id) {
        return this.Ticket.findOne({
            where: {
                id_ticket: id
            }
        });
    }

    async createTicket(body) {
        return this.Ticket.create(body)
    }

    async updateTicketQuanity(ticket) {
        return this.Ticket.update({stock: ticket.stock, updated_at: ticket.updated_at}, {
            where: {
                id_ticket: ticket.id_ticket
            },
            transaction: ticket.t
        })
    }
}