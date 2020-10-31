class Order {
    constructor({id_order, id_transaction, id_ticket, order_amount, order_qty, created_at, updated_at}) {
        this.id_order = id_order
        this.id_transaction = id_transaction
        this.id_ticket = id_ticket
        this.order_amount = order_amount
        this.order_qty = order_qty
        this.created_at = !created_at ? undefined : MOMENT(created_at).format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = !updated_at ? undefined : MOMENT(updated_at).format('YYYY-MM-DD HH:mm:ss')
    }

    ValidateCreate(){
        if ( _.isEmpty(this.id_ticket) || !this.order_amount || !this.order_qty) {
            return {
                check: false,
                message: "all field required"
            }
        }
        if ( isNaN(+this.order_amount) || +this.order_amount < 0) {
            return {
                check: false,
                message: "order amount cannot go lower than 0 and cannot be 0"
            }
        }
        if ( isNaN(+this.order_qty) || +this.order_qty < 0) {
            return {
                check: false,
                message: "order quantity cannot go lower than 0 and cannot be 0"
            }
        }
        return {
            check: true,
            message: "ok"
          }
    }
}

class OrderRepository {
    createOrder() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    createBulkOrder() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}
class OrderUseCase {
  createOrder() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = {
    Order,
    OrderRepository,
    OrderUseCase
}