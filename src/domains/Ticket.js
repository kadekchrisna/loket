class Ticket {
    constructor({id_ticket,id_event, name, desc, stock, price, created_at, updated_at, event}) {
        this.id_ticket = id_ticket
        this.id_event = id_event
        this.name = name
        this.desc = desc
        this.stock = stock
        this.price = price
        this.event = event
        this.created_at = !created_at ? undefined : MOMENT(created_at).format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = !updated_at ? undefined : MOMENT(updated_at).format('YYYY-MM-DD HH:mm:ss')
    }

    ValidateCreate(){
        if (_.isEmpty(this.id_event) || _.isEmpty(this.desc) || _.isEmpty(this.name) || !this.stock || !this.price) {
            return {
                check: false,
                message: "all field required"
            }
        }
        if ( isNaN(+this.stock) || +this.stock < 0) {
            return {
                check: false,
                message: "stock cannot go lower than 0 and cannot be 0"
            }
        }
        if (isNaN(+this.price) || +this.price < 0) {
            return {
                check: false,
                message: "price cannot go lower than 0 and cannot be 0"
            }
        }
        return {
            check: true,
            message: "ok"
        }
    }
    ValidateID(){
        if (_.isEmpty(this.id_ticket)) {
            return {
                check: false,
                message: "id ticket is required"
            }
        }
        return {
            check: true,
            message: "ok"
        }
    }
}

class TicketRepository {
    getTicketByID(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    createTicket(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    updateTicketQuanity(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}
class TicketUseCase {
    getTicket(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    createTicket(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}

module.exports = {
    Ticket,
    TicketRepository,
    TicketUseCase,
}