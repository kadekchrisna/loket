const CustomerUseCase = require('../../domains/Customer').CustomerUseCase;
const Customer = require('../../domains/Customer').Customer

module.exports = class extends CustomerUseCase {
    constructor(customer) {
        super();
        this.customer = customer
    }

    async createCustomer(body){
        try {
            const customer = new Customer(body)
            const validation = customer.ValidateCreate()

            if (!validation.check) {
                const response = MISC.responses({
                    status: 400,
                    message: validation.message
                })
                return response
            }
            console.log(customer);
            const result = await this.customer.createCustomer(customer)
            if (_.isEmpty(result)) {
                const response = MISC.responses({
                    status: 400,
                    message: "failed create customer"
                })
                return response
            }
            customer.id_customer = result.id_customer

            const response = MISC.responses({
                status: 200,
                message: "success"
            }, customer)
            return response
        } catch (error) {
            console.log(error);
            if ('name' in error) {
                if (error.name.includes('Unique')) {
                    const response = MISC.responses({
                        status: 400,
                        message: "phone or email is already been used"
                    })
                    return response
                }
            }
            const response = MISC.responses({
                status: 400,
                message: error
            })
            return response
        }

    }
}