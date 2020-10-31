class Event {
    constructor({id_event, id_location, name, desc, start_date, end_date, created_at, updated_at, location, tickets}) {
        this.id_event = id_event
        this.id_location = id_location
        this.name = name
        this.desc = desc
        this.start_date = MOMENT(start_date).format('YYYY-MM-DD HH:mm:ss')
        this.end_date = MOMENT(end_date).format('YYYY-MM-DD HH:mm:ss')
        this.location = location
        this.tickets = tickets
        this.created_at = !created_at ? undefined : MOMENT(created_at).format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = !updated_at ? undefined : MOMENT(updated_at).format('YYYY-MM-DD HH:mm:ss')
    }

    ValidateCreate(){
        if (_.isEmpty(this.desc) || _.isEmpty(this.name) || _.isEmpty(this.id_location) || !MOMENT(this.start_date).isValid() || !MOMENT(this.end_date).isValid()) {
          return {
            check: false,
            message: "all field required and all field must be string"
          }
        } 
        if (!MOMENT(this.start_date).isSameOrBefore(this.end_date)) {
          return {
            check: false,
            message: "start date event must be lower than or same as end date event"
          }
        }
        return {
          check: true,
          message: "ok"
        }
    }
    ValidateID(){
        if (!this.id_event || this.id_event.length != 36) {
            return false
        }
        return true
    }
}

class EventRepository {
  getAllEvents() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  getEventByID() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  getEventByIDWithLocationAndTicket() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  createEvent() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
}
class EventUseCase {
  getAllEvents() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  getEvent() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  createEvent() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = {
    Event,
    EventRepository,
    EventUseCase,
}