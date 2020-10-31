const OrderRepo = require("../../domains/Order").OrderRepository

module.exports = class extends OrderRepo {
    constructor(order) {
        super();
        this.order = order
    }

    async createOrder(body) {
        return this.order.create(body)
    }

    async createBulkOrder(body) {
        return this.order.bulkCreate(body)
    }
}