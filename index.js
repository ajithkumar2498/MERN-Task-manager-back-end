import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js"
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

dotenv.config();

dbConnection();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5001", "https://aktaskmanager.netlify.app", "https://aktaskmanager.netlify.app/login"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.send('Task Manager API is running...');
});

app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));