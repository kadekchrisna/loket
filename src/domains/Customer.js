class Customer {
    constructor({id_customer, name, email, phone, created_at, updated_at}) {
        this.id_customer = id_customer
        this.name = name
        this.email = email
        this.phone = phone
        this.created_at = !created_at ? undefined : MOMENT(created_at).format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = !updated_at ? undefined : MOMENT(updated_at).format('YYYY-MM-DD HH:mm:ss')
    }

    ValidateCreate(){
        if (_.isEmpty(this.email) || _.isEmpty(this.name) || _.isEmpty(this.phone)) {
            return {
                check: false,
                message: "all field required and all field must be string"
            }
        }
        if (Array.isArray(this.phone.match(/([A-Za-z])/g))) {
            return {
                check: false,
                message: "phone must be a number"
            }
        }
        if (this.email.split('@').length < 2) {
            return {
                check: false,
                message: "email must be a valid email"
            }
        } 
        if (this.email.split('@').length > 1) {
            if (!this.email.split('@')[1].includes('.')) {
                return {
                    check: false,
                    message: "email must be a valid email"
                }
            }
        }
        return {
            check: true,
            message: "ok"
          }
    }
}

class CustomerRepository {
    createCustomer() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    getCustomerByID() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}
class CustomerUseCase {
    createCustomer() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
    getCustomer() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}

module.exports = {
    Customer,
    CustomerRepository,
    CustomerUseCase
}