export class ApiError extends Error {
  public readonly status: number;
  public readonly success: boolean;
  public readonly isOperational: boolean;
  public readonly errors?: unknown;
  override message: string;

  constructor(
    status: number,
    message: string,
    errors?: unknown,
    stack?: string
  ) {
    super(message);
    this.success = false;
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.status = status;
    this.errors = errors;
    this.isOperational = true;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

export class ApiResponse {
  status: number;
  success: boolean;
  data: unknown;
  message: string;

  constructor(status: number, message: string, data: unknown) {
    this.success = true;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
