import express from "express";
import { publicRoutes } from "../Routes/routes.js";

export const web = express();

web.use(express.json());

web.use("/api", publicRoutes);

web.use("/api", (req, res) => {
  res.json({ message: "API is working" });
});
