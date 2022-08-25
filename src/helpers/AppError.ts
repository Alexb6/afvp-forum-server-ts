class AppError extends Error {
  statusCode: number;
  errorLevel: string;
  constructor(statusCode: number, message: string, errorLevel: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.message = message;
    this.errorLevel = errorLevel || 'error';
  }
}

export default AppError;
