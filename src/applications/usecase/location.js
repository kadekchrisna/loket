const LocUseCase = require("../../domains/Location").LocationUseCase
const Event = require('../../domains/Event').Event
const Location = require('../../domains/Location').Location

module.exports = class extends LocUseCase {
    constructor(loc) {
        super();
        this.loc = loc
    }

    async getAllLocations() {
        try {
            const result = await this.loc.getAllLocations()
            const locations = []
            if (result.length > 0) {
                for (const loc of result) {
                    const events = []
                    if (loc.events.length > 0) {
                        for (const event of loc.events) {
                            events.push(new Event(event))
                        }
                    }
                    loc.events = events
                    locations.push(new Location(loc))
                }
            }

            const response = MISC.responses({
                status: 200,
                message: "success"
            }, locations)
            return response
        } catch (error) {
            console.log(error);
            const response = MISC.responses({
                status: 200,
                message: error
            })
            return response
        }
    }

    async createLocation(body) {
        try {
            const location = new Location(body)
            const validation = location.ValidateCreate()
            if (!validation.check) {
                const response = MISC.responses({
                    status: 400,
                    message: validation.message
                })
                return response
            }
            console.log(location);
            const result = await this.loc.createLocation(location)
            console.log(result);
            if (_.isEmpty(result)) {
                const response = MISC.responses({
                    status: 400,
                    message: "failed create location"
                })
                return response
                
            }
            location.id_location = result.id_location
            const response = MISC.responses({
                status: 201,
                message: "success"
            }, location)
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