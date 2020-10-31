module.exports = (usecase) => {
    const createCustomer = async (req, res) => {
        const result = await usecase.createCustomer(req.body)
        return res.status(result.status).send(result.response)
    }
    return {
        createCustomer
    }
}