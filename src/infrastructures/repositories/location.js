const LocationRepository = require("../../domains/Location").LocationRepository

module.exports = class extends LocationRepository{
    constructor(location, event) {
        super();
        this.Location = location
        this.Event = event
    }

    async getAllLocations() {
        return this.Location.findAll({
            include: {
                model: this.Event
            }
        });
    }
    async getLocationByID(id) {
        return this.Location.findOne({
            where: {
                id_location: id
            }
        });
    }

    async createLocation(body) {
        return this.Location.create(body)
    }
}