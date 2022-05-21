import { Request, Response, NextFunction } from "express";

const validator =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const validationValue = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
      convert: false,
      skipFunctions: true,
    });
    if (validationValue.error) {
      const errorMessages = validationValue.error.details.map(
        (error: any) => error.message
      );

      return res.status(400).json({ error: errorMessages });
    }

    return next();
  };

export default validator;
