import request from "supertest";
import app from "../src/app";
import { User } from "../src/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../models"); // Mock Sequelize models

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register/admin", () => {
    it("should register a new admin successfully", async () => {
      const newAdmin = { email: "admin@example.com", password: "password123" };

      (User.findOne as jest.Mock).mockResolvedValue(null); // No existing user
      (User.create as jest.Mock).mockResolvedValue({
        id: 1,
        email: newAdmin.email,
        userType: "admin",
      });

      const response = await request(app)
        .post("/auth/register/admin")
        .send(newAdmin)
        .expect(201);

      expect(response.body).toMatchObject({
        message: "Admin registered successfully.",
        user: { id: 1, email: newAdmin.email, userType: "admin" },
      });
    });

    it("should return error if email is already in use", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        email: "admin@example.com",
      });

      const response = await request(app)
        .post("/auth/register/admin")
        .send({ email: "admin@example.com", password: "password123" })
        .expect(400);

      expect(response.body).toEqual({ error: "Email already in use" });
    });
  });

  describe("POST /register/user", () => {
    it("should register a new user successfully", async () => {
      const newUser = { email: "user@example.com", password: "password123" };

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue({
        id: 2,
        email: newUser.email,
        userType: "user",
      });

      const response = await request(app)
        .post("/auth/register/user")
        .send(newUser)
        .expect(201);

      expect(response.body).toMatchObject({
        message: "User registered successfully.",
        user: { id: 2, email: newUser.email, userType: "user" },
      });
    });

    it("should return error if email is already in use", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        email: "user@example.com",
      });

      const response = await request(app)
        .post("/auth/register/user")
        .send({ email: "user@example.com", password: "password123" })
        .expect(400);

      expect(response.body).toEqual({ error: "Email already in use." });
    });
  });

  describe("POST /login", () => {
    it("should login successfully and return a token", async () => {
      const user = {
        id: 1,
        email: "user@example.com",
        password: await bcrypt.hash("password123", 10), // Mock hashed password
        userType: "user",
      };

      (User.findOne as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mocked_jwt_token");

      const response = await request(app)
        .post("/auth/login")
        .send({ email: "user@example.com", password: "password123" })
        .expect(200);

      expect(response.body).toMatchObject({
        message: "Login successful.",
        token: "mocked_jwt_token",
        user: { id: 1, email: "user@example.com", userType: "user" },
      });
    });

    it("should return error for invalid email", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/auth/login")
        .send({ email: "invalid@example.com", password: "password123" })
        .expect(404);

      expect(response.body).toEqual({ error: "Invalid email or password." });
    });

    it("should return error for invalid password", async () => {
      const user = {
        id: 1,
        email: "user@example.com",
        password: await bcrypt.hash("password123", 10),
        userType: "user",
      };

      (User.findOne as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Wrong password

      const response = await request(app)
        .post("/auth/login")
        .send({ email: "user@example.com", password: "wrongpassword" })
        .expect(401);

      expect(response.body).toEqual({ error: "Invalid email or password." });
    });
  });
});
