import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      
      res.status(400).json({
        message: "Validation failed",
        errors: fieldErrors
      });
      return;
    }

    req.body = result.data; 
    next();
  };
