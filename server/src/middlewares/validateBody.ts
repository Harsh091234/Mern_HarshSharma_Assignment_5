import type { NextFunction, RequestHandler } from "express";
import type { z } from "zod";

export const validateBody =
  <T extends z.ZodTypeAny>(schema: T): RequestHandler =>
  async(req, res, next) => {
      try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
      } catch (error: any) {
        res.status(400).json({
          message:
            error.issues.map((issue: any) => ({
              field: issue.path.join("."),
              message: issue.message,
            })) || "Validation failed",
        });
      }
  };
