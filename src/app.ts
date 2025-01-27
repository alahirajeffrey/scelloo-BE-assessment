import express from "express";
import { sequelize } from "./config";
import { rateLimiter } from "./middlewares";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { productRouter, authRouter } from "./routes";

const app = express();
const port = process.env.PORT || 3000;

// connect to the database
sequelize
  .authenticate()
  .then(() => console.log("postgres database connected!"))
  .catch((err) => console.error("unable to connect to postgres:", err))

  // sync database for now. would setup migrations later
  .finally(() => {
    sequelize.sync({ force: true });
  });

// setup server
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(morgan("combined"));

app.use(rateLimiter);
app.use(express.json());

// setup routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
