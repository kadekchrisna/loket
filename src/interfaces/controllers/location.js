module.exports = (usecase) => {
    const getLocations = async (req, res) => {
        const result = await usecase.getAllLocations()
        return res.status(result.status).send(result.response)
    }
    const getLocation = async (req, res) => {
        const result = await usecase.getLocation(req.params.id)
        return res.status(result.status).send(result.response)
    }
    const createLocation = async (req, res) => {
        try {
            const result = await usecase.createLocation(req.body)
            return res.status(result.status).send(result.response)
        } catch (error) {
            console.log(error);
            return error
        }
    }
    return {
        getLocations,
        getLocation,
        createLocation
    }
}