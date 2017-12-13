class Response {
  constructor (status, message, data) {
    this.status = status
    this.message = message
    this.data = data
  }

  getStatus () {
    return this.status
  }

  getMessage () {
    return this.message
  }

  getData () {
    return this.data
  }
}

export default Response
