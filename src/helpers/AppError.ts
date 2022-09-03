class AppError extends Error {
  statusCode: number;
  level: string;
  constructor(statusCode: number, message: string, level: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.message = message;
    this.level = level || 'error' || 'warning';
  }
}

export default AppError;
