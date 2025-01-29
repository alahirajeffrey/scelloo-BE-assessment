import { Router, Request, Response } from "express";
import { validate } from "../middlewares";
import { createProductValidation } from "../validations";
import asyncHandler from "express-async-handler";
import { isLoggedIn, isAdmin } from "../middlewares";
import { Product } from "../models";

const productRouter = Router();

productRouter.post(
  "",
  isLoggedIn,
  isAdmin,
  validate(createProductValidation),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  })
);

productRouter.patch(
  "",
  validate(createProductValidation),
  asyncHandler(async (req: Request, res: Response) => {})
);

productRouter.get(
  "/all",
  validate(createProductValidation),
  asyncHandler(async (req: Request, res: Response) => {})
);

productRouter.get(
  "/:productId",
  validate(createProductValidation),
  asyncHandler(async (req: Request, res: Response) => {})
);

productRouter.delete(
  "/:productId",
  validate(createProductValidation),
  asyncHandler(async (req: Request, res: Response) => {})
);

export { productRouter };
