
const TransUseCase = require('../../domains/Transaction').TransactionUseCase;
const Order = require("../../domains/Order").Order
const Transaction = require("../../domains/Transaction").Transaction

module.exports = class extends TransUseCase {
    constructor(trans, order, customer, ticket, sequelize) {
        super();
        this.trans = trans
        this.order = order
        this.customer = customer
        this.ticket = ticket
        this.sequelize = sequelize
    }

    async createTransaction(body){
        let t;
        try {
            if (Array.isArray(body.cart)) {
                if (body.cart.length > 0) {
                    let validation = {}
                    let total = 0
                    const orders = []
                    const tempStock = {}

                    for (const ticket of body.cart) {
                        let order_amount = ticket.price * ticket.qty
                        total += order_amount
                        const order = new Order({...ticket, ...{order_amount: order_amount, order_qty: ticket.qty}})
                        validation = order.ValidateCreate()
                        if (!validation.check) {
                            break
                        }
                        const checkTicket = await this.ticket.getTicketByID(ticket.id_ticket)
                        if (_.isEmpty(checkTicket)) {
                            validation = {
                                check: false,
                                message: `ticket id ${ticket.id_ticket} not found`
                            }
                            break
                        }
                        if (checkTicket.stock < 1 || (checkTicket.stock - ticket.qty) < 1) {
                            validation = {
                                check: false,
                                message: `ticket id ${ticket.id_ticket} has 0 stock`
                            }
                            break
                            
                        }
                        tempStock[ticket.id_ticket] = checkTicket.stock - ticket.qty
                        orders.push(order)
                    }
                    if (!validation.check) {
                        const response = MISC.responses({
                            status: 400,
                            message: validation.message
                        })
                        return response
                        
                    }
                    let invoice_number = `LK-${new Date().getTime()}`
                    const transaction = new Transaction({ id_transaction: undefined, id_customer: body.id_customer, invoice_amount: total, invoice_number: invoice_number })

                    const checkCustomer = await this.customer.getCustomerByID(body.id_customer)
                    if (_.isEmpty(checkCustomer)) {
                        const response = MISC.responses({
                            status: 400,
                            message: `customer id ${body.id_customer} nof found`
                        })
                        return response
                    }
                    t = await this.sequelize.transaction();
                    const nTransaction = await this.trans.createTransaction(transaction, t)
                    if (_.isEmpty(nTransaction)) {
                        const response = MISC.responses({
                            status: 400,
                            message: `failed create transaction`
                        })
                        return response
                    }

                    
                    transaction.id_transaction = nTransaction.id_transaction
                    let broke = false
                    for (const order of orders) {
                        order.id_transaction = nTransaction.id_transaction
                        const updateTicket = await this.ticket.updateTicketQuanity({id_ticket: order.id_ticket, updated_at: MOMENT().format('YYYY-MM-DD HH:mm:ss'), stock: tempStock[order.id_ticket], t: t})
                        if (!updateTicket[0]) {
                            await t.rollback()
                            broke = true
                            break
                        }
                    }
                    if (broke) {
                        const response = MISC.responses({
                            status: 400,
                            message: `failed update stock ticket`
                        })
                        return response
                    } else {
                        await t.commit()
                    }

                    const nOrders = await this.order.createBulkOrder(orders)
                    if (nOrders.length < 1) {
                        const response = MISC.responses({
                            status: 400,
                            message: `failed create orders`
                        })
                        return response
                    }
                    const response = MISC.responses({
                        status: 200,
                        message: `success`
                    }, transaction)
                    return response
                }
                
            } 
            const response = MISC.responses({
                status: 400,
                message: "order must be an array of tickets"
            })
            return response
        } catch (error) {
            if (t) {
                await t.rollback();
            }
            console.log(error);
            const response = MISC.responses({
                status: 400,
                message: error
            })
            return response
        }
    }
    async getTransaction(id) {
        try {
            const transaction = new Transaction({id_transaction: id})
            const validation = transaction.ValidateID()

            if (!validation.check) {
                const response = MISC.responses({
                    status: 400,
                    message: validation.message
                })
                return response
            }
            const result = await this.trans.getTransactionByID(transaction.id_transaction)
            if (_.isEmpty(result)) {
                const response = MISC.responses({
                    status: 404,
                    message: `transaction with id ${transaction.id_transaction} not found`
                })
                return response
            }
            const response = MISC.responses({
                status: 200,
                message: "success"
            }, result)
            return response
        } catch (error) {
            console.log(error);
            const response = MISC.responses({
                status: 400,
                message: error
            })
            return response
        }
    }
}