const EventRepository = require('../../domains/Event').EventRepository

module.exports = class extends EventRepository {
    constructor(event, location, ticket) {
        super();
        this.Event = event;
        this.Location = location;
        this.Ticket = ticket;
    }

    async getAllEvents() {
        return this.Event.findAll({
            include: [
                {
                    model: this.Location
                }, 
                {
                    model: this.Ticket
                }
            ]
        })
    }
    async getEventByIDWithLocationAndTicket(id) {
        return this.Event.findOne({
            where: {
                id_event: id
            },
            include: [
                {
                    model: this.Location
                }, 
                {
                    model: this.Ticket
                }
            ]
        })
    }
    async getEventByID(id) {
        return this.Event.findOne({
            where: {
                id_event: id
            }
        })
    }
    async createEvent(body) {
        return this.Event.create(body)
    }
}

