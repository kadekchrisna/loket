const TicketUseCase = require("../../domains/Ticket").TicketUseCase
const Ticket = require('../../domains/Ticket').Ticket

module.exports = class extends TicketUseCase {

    constructor(ticket, event){
        super();
        this.ticket = ticket
        this.event = event
    }

    async getTicket(id) {
        try {  
            let ticket = new Ticket({id_ticket: id})
            const validation = ticket.ValidateID()

            if (!validation.check) {
                const response = MISC.responses({
                    status: 400,
                    message: validation.message
                })
                return response
            }

            const result = await this.ticket.getTicketByID(ticket.id_ticket)
            if (_.isEmpty(result)) {
                const response = MISC.responses({
                    status: 404,
                    message: `ticket not found with id ${ticket.id_ticket}`
                })
                return response
            }

            ticket = new Ticket(result)
            const response = MISC.responses({
                status: 200,
                message: "success"
            }, ticket)
            return response

        } catch (error) {
            console.log(error);
            const response = MISC.responses({
                status: 400,
                message: error
            })
            return response
        }

    }

    async createTicket(body) {
        try {
            const ticket = new Ticket(body)
            const validation = ticket.ValidateCreate()
            if (!validation.check) {
                const response = MISC.responses({
                    status: 400,
                    message: validation.message
                })
                return response
            }

            const check = await this.event.getEventByID(ticket.id_event)
            if (_.isEmpty(check)) {
                const response = MISC.responses({
                    status: 400,
                    message: `event with id ${ticket.id_event} not found`
                })
                return response
            }

            const result = await this.ticket.createTicket(ticket)
            if (_.isEmpty(result)) {
                const response = MISC.responses({
                    status: 400,
                    message: "failed create ticket"
                })
                return response
            }

            ticket.id_ticket = result.id_ticket
            const response = MISC.responses({
                status: 200,
                message: "success"
            }, ticket)
            return response
            
        } catch (error) {
            console.log(error);
            const response = MISC.responses({
                status: 400,
                message: error
            })
            return response
        }
    }

}