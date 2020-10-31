const EventUseCase = require('../../domains/Event').EventUseCase
const Event = require('../../domains/Event').Event
const Location = require('../../domains/Location').Location
const Ticket = require('../../domains/Ticket').Ticket

module.exports = class extends EventUseCase {
    constructor(event, loc){
        super();
        this.event = event
        this.loc = loc
    }

    async getAllEvents(){
        try {
            const result = await this.event.getAllEvents()
            const events = []
            if(result.length > 0) {
                for (const raw of result) {
                    const tickets = []
                    if (raw.tickets.length > 0) {
                        for (const ticket of raw.tickets) {
                            tickets.push(new Ticket(ticket))
                        }
                    }
                    raw.location = new Location(raw.location)
                    raw.tickets = tickets
                    const event = new Event(raw)
                    events.push(event)
                }

            }

            const response = MISC.responses({
                status: 200,
                message: "success"
            }, events)
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
    async getEvent(id){
        try {
            let event = new Event({id_event: id})

            if (!event.ValidateID()) {
                const response = MISC.responses({
                    status: 400,
                    message: "id not valid"
                })
                return response
            }
            const result = await this.event.getEventByID(event.id_event)
            const tickets = []

            if(!_.isEmpty(result)) {
                if (result.tickets.length > 0) {
                    for (const ticket of result.tickets) {
                        tickets.push(new Ticket(ticket))
                    }
                }
                result.location = new Location(result.location)
                result.tickets = tickets
                event = new Event(result)
            }

            const response = MISC.responses({
                status: 200,
                message: "success"
            }, event)
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

    async createEvent(body) {
        try {
            const event = new Event(body)
            console.log(event);
            const validation = event.ValidateCreate()

            if (!validation.check) {
                const response = MISC.responses({
                    status: 400,
                    message: validation.message
                })
                return response
            }

            const check = await this.loc.getLocationByID(event.id_location)
            if (_.isEmpty(check)) {
                const response = MISC.responses({
                    status: 400,
                    message: `location with id ${event.id_location} is not found`
                })
                return response
            }

            const result = await this.event.createEvent(event)
            if (_.isEmpty(result)) {
                const response = MISC.responses({
                    status: 400,
                    message: `failed create event`
                })
                return response
            }
            event.id_event = result.id_event
            const response = MISC.responses({
                status: 200,
                message: "success"
            }, event)
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