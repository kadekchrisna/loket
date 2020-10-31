const CustomerRepos = require("../../domains/Customer").CustomerRepository

module.exports = class extends CustomerRepos {
    constructor(customer) {
        super();
        this.Customer = customer
    }

    async createCustomer(body) {
        return this.Customer.create(body)
    }

    async getCustomerByID(id){
        return this.Customer.findOne({
            where: {
                id_customer: id
            }
        })
    }
}