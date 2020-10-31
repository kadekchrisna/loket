module.exports = (usecase) => {
    const getTransaction = async (req, res) => {
        const result = await usecase.getTransaction(req.params.id)
        return res.status(result.status).send(result.response)
    }
    const createTransaction = async (req, res) => {
        const result = await usecase.createTransaction(req.body)
        return res.status(result.status).send(result.response)
    }
    return {
        getTransaction,
        createTransaction
    }
}