import { Response } from 'express';
import { z } from 'zod';

export const handleValidationError = (res: Response, error: unknown) => {
  if (error instanceof z.ZodError) {
    const formattedErrors = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Dữ liệu không hợp lệ',
      errors: formattedErrors,
    });
  }

  return res.status(500).json({
    status: 'error',
    code: 500,
    message: 'Lỗi hệ thống không xác định',
  });
};
