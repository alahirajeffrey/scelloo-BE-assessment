import { Router, Request, Response } from "express";
import { loginLimiter, validate } from "../middlewares";
import { loginUserValidation, registerUserValidation } from "../validations";
import { User } from "../models";
import bcrypt from "bcrypt";
import { UserEnum } from "../enums";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const authRouter = Router();

// add try catch blocks
authRouter.post(
  "/register/admin",
  validate(registerUserValidation),
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Email already in use." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      email,
      password: hashedPassword,
      userType: UserEnum.ADMIN,
    });

    res.status(201).json({
      message: "Admin registered successfully.",
      user: { id: admin.id, email: admin.email, userType: admin.userType },
    });
  })
);

authRouter.post(
  "/register/user",
  validate(registerUserValidation),
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Email already in use." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      email,
      password: hashedPassword,
      userType: UserEnum.USER,
    });

    res.status(201).json({
      message: "User registered successfully.",
      user: { id: admin.id, email: admin.email, userType: admin.userType },
    });
  })
);

authRouter.post(
  "/login",
  loginLimiter,
  validate(loginUserValidation),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "Invalid email or password." });
      return;
    }

    // compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    // generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.userType,
      },
      process.env.JWT_SECRET || "jwt_secret",
      { expiresIn: "1d" }
    );

    // respond with token and user data
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
      },
    });
  })
);

export { authRouter };
