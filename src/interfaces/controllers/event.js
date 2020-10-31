module.exports = (usecase) => {
    const getEvents = async (req, res) => {
        const result = await usecase.getAllEvents()
        return res.status(result.status).send(result.response)
    }
    const getEvent = async (req, res) => {
        const result = await usecase.getEvent(req.params.id)
        return res.status(result.status).send(result.response)
    }
    const createEvent = async (req, res) => {
        const result = await usecase.createEvent(req.body)
        return res.status(result.status).send(result.response)
    }
    return {
        getEvents,
        getEvent,
        createEvent
    }
}