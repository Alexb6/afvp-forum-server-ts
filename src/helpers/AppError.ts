class AppError extends Error {
  statusCode;
  level;
  constructor(statusCode: number, message: string, level = 'error') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.message = message;
    this.level = level;
  }
}

export default AppError;
