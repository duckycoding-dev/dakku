import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { ErrorResponse } from 'src/types/response';

const DEFAULT_ERROR_MAPPING: ErrorMapping = {
  status: 500,
  message: 'Internal Server Error',
  code: 'INTERNAL',
};

const DEFAULT_ERROR_RESPONSE: ErrorResponse = {
  success: false,
  error: DEFAULT_ERROR_MAPPING.message,
  code: DEFAULT_ERROR_MAPPING.code,
};

export type ErrorCode =
  | 'NOT_FOUND'
  | 'VALIDATION'
  | 'ACCESS_DENIED'
  | 'SERVICE_FAILURE'
  | 'INTERNAL'
  | (string & {}); // Allows custom error types in the future

export type ErrorMapping = {
  status: ContentfulStatusCode;
  message: string;
  code: ErrorCode;
};

const errorMap: Record<ErrorCode, ErrorMapping> = {
  NOT_FOUND: { status: 404, message: 'Resource not found', code: 'NOT_FOUND' },
  VALIDATION: { status: 400, message: 'Invalid input', code: 'VALIDATION' },
  ACCESS_DENIED: {
    status: 403,
    message: 'Access denied',
    code: 'ACCESS_DENIED',
  },
  SERVICE_FAILURE: {
    status: 503,
    message: 'External service failure',
    code: 'SERVICE_FAILURE',
  },
  INTERNAL: DEFAULT_ERROR_MAPPING,
} as const;

type AppErrorOptions = {
  message?: string;
  hideToClient?: boolean;
  statusCodeOverride?: ContentfulStatusCode;
  cause?: unknown;
};

/**
 * Custom error class to handle application-specific errors.
 * The resulting status code and message are determined by the error type if none are provided.
 * @class
 * @param type - The type of error to throw.
 * @param options - Additional options for the error.
 * @param options.statusCodeOverride - Override the default status code that is defined by the mapper based on the passed error type.
 * @param options.message - Custom error message to display - if omitted the generic mapped message will be shown instead.
 * @param options.hideToClient - Whether to hide the custom error message from the client and show the generic mapped message instead.
 * @example
 * ```ts
 * throw new AppError('NOT_FOUND');
 * throw new AppError('VALIDATION', { message: 'Invalid email' });
 * throw new AppError('INTERNAL', { hideToClient: true });
 * ```
 */
export class AppError extends Error {
  readonly name: 'AppError';
  readonly code: ErrorCode;
  readonly hideToClient: boolean;
  readonly status: ContentfulStatusCode;

  constructor(
    code: ErrorCode = DEFAULT_ERROR_MAPPING.code,
    options: AppErrorOptions = {},
  ) {
    const mappedError = errorMap[code];
    const status =
      options.statusCodeOverride ??
      mappedError?.status ??
      DEFAULT_ERROR_MAPPING.status;

    const finalMessage =
      options.message || mappedError?.message || DEFAULT_ERROR_MAPPING.message;
    super(finalMessage, {
      cause: options.cause,
    });

    Object.setPrototypeOf(this, AppError.prototype);

    this.status = status;
    this.name = 'AppError';
    this.code = code;
    this.hideToClient = options.hideToClient ?? false;
  }
}

const serializeError = (err: Error) => {
  return {
    name: err.name,
    message: err.message,
    stack: err.stack,
    cause: err.cause,
    ...(err instanceof AppError
      ? {
          code: err.code,
          status: err.status,
          hideToClient: err.hideToClient,
        }
      : {}),
  };
};

export const errorHandler = (err: Error | AppError, c: Context): Response => {
  console.error(
    `[${new Date().toISOString()}] Error:`,
    JSON.stringify(serializeError(err), null, 2),
  );

  if (err instanceof AppError) {
    const message: string =
      process.env.NODE_ENV === 'development' || !err.hideToClient
        ? err.message
        : (errorMap[err.code]?.message ?? 'Internal Server Error');

    const cause: unknown =
      process.env.NODE_ENV === 'development' ? err.cause : undefined;

    const errorResponse: ErrorResponse = {
      success: false,
      error: message,
      code: err.code,
      cause: cause,
    };

    return c.json(errorResponse, err.status);
  }

  // Handle unexpected errors
  return c.json(DEFAULT_ERROR_RESPONSE, DEFAULT_ERROR_MAPPING.status);
};
