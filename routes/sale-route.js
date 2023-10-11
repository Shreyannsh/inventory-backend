import express from "express";
import { addSale } from "../controller/inventory-controller.js";

const SaleRouter = express.Router();

SaleRouter.post("/sales/add-sale", addSale);

export default SaleRouter;
