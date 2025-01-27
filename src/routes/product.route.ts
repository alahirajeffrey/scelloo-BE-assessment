import { Router } from "express";
import { validate } from "../middlewares";
import { createProductValidation } from "../validations";
import asyncHandler from "express-async-handler";
import { isLoggedIn, isAdmin } from "../middlewares";

const productRouter = Router();

productRouter.post(
  "",
  isLoggedIn,
  isAdmin,
  validate(createProductValidation),
  asyncHandler(async (req: Request, res: Response) => {})
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
