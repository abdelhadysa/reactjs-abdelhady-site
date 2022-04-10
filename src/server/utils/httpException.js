class HttpException extends Error {
    constructor (status, message) {
        super()
        this.name = this.constructor.name
        this.statusCode = status
        this.message = `${message} - HTTP ${status}`
    }
}

export default HttpException