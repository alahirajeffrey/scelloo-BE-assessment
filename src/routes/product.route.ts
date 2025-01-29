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
  isLoggedIn,
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  })
);

productRouter.get(
  "/:productId",
  isLoggedIn,
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  })
);

productRouter.delete(
  "/:productId",
  isLoggedIn,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const product = await Product.findByPk(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      await product.destroy();
      res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  })
);

export { productRouter };
