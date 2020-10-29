module.exports = class Customer {
    constructor(name, email, phone) {
        this.id = null
        this.name = null
        this.email = null
        this.phone = null
        this.created_at = null
        this.updated_at = null
    }

    Validate(){
        if (!this.email || !this.name || !this.phone || this.phone.match(/([A-Z, a-z])/g).length > 0 || this.email.split('@').length > 1) {
            return true
        }
        return false
    }
}