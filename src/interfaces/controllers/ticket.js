module.exports = (usecase) => {
    const getTicket = async (req, res) => {
        const result = await usecase.getTicket(req.params.id)
        return res.status(result.status).send(result.response)
    }
    const createTicket = async (req, res) => {
        const result = await usecase.createTicket(req.body)
        return res.status(result.status).send(result.response)
    }
    return {
        getTicket,
        createTicket
    }
}