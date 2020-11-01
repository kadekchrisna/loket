class Transaction {
    constructor({id_transaction, id_customer, invoice_number, invoice_amount, created_at, updated_at, orders}) {
        this.id_transaction = id_transaction
        this.id_customer = id_customer
        this.invoice_number = invoice_number
        this.invoice_amount = invoice_amount
        this.orders = orders
        this.created_at = !created_at ? undefined : MOMENT(created_at).format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = !updated_at ? undefined : MOMENT(updated_at).format('YYYY-MM-DD HH:mm:ss')
    }
    ValidateID(){
        if (_.isEmpty(this.id_transaction)) {
            return {
                check: false,
                message: "id transaction is required"
            }
        }
        return {
            check: true,
            message: "ok"
        }
    }
}

class TransactionRepository {
    createTransaction() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    getTransactionByID() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}
class TransactionUseCase {
    createTransaction() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    getTransaction() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}

module.exports = {
    Transaction,
    TransactionRepository,
    TransactionUseCase
}