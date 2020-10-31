const { isEmpty } = require("lodash")

class Location {
    constructor({id_location, name, address, street, city, country, zip, latitude, longitude, created_at, updated_at, events}) {
        this.id_location = id_location
        this.name = name
        this.address = address
        this.street = street
        this.city = city
        this.country = country
        this.zip = zip
        this.latitude = latitude
        this.longitude = longitude
        this.events = events
        this.created_at = !created_at ? undefined : MOMENT(created_at).format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = !updated_at ? undefined : MOMENT(updated_at).format('YYYY-MM-DD HH:mm:ss')
    }

    ValidateCreate(){
        if (_.isEmpty(this.name) || _.isEmpty(this.address) || _.isEmpty(this.street) || _.isEmpty(this.city) || _.isEmpty(this.country) || _.isEmpty(this.zip) || _.isEmpty(this.latitude) || _.isEmpty(this.longitude)) {
            return {
                check: false,
                message: "all field required and all field must be string"
            }
        } 
        if(Array.isArray(this.zip.match(/([A-Za-z])/g))){
            return {
                check: false,
                message: "zip must only contain number"
            }

        } 
        if (Array.isArray(this.latitude.match(/([A-Za-z])/g))) {
            return {
                check: false,
                message: "latitude must only contain number"
            }
            
        } 
        if (Array.isArray(this.longitude.match(/([A-Za-z])/g))) {
            console.log(this.longitude.match(/([A-Za-z])/g));
            return {
                check: false,
                message: "longitude must only contain number"
            }
        }
        return {
            check: true,
            message: "ok"
        }
    }
}

class LocationRepository {
    getAllLocations(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    getLocationByID(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    createLocation(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}
class LocationUseCase {
    getAllLocations(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    getLocation(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    createLocation(){
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}

module.exports = {
    Location,
    LocationRepository,
    LocationUseCase,
}