class InvalidArgument extends Error {
  constructor(args) {
    super(args);
    this.name = "InvalidArgument"
  }
}

class DBOperationFailed extends Error {
  constructor(args) {
    super(args);
    this.name = "DBOperationFailed"
  }
}

class NotFound extends Error {
  constructor(args) {
    super(args);
    this.name = "NotFound"
  }
}

module.exports = {
  DBOperationFailed,
  InvalidArgument,
  NotFound,
}
