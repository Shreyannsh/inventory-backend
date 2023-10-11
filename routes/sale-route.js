import express from "express";
import {
	addSale,
	getAllSales,
	removeSale,
} from "../controller/inventory-controller.js";

const SaleRouter = express.Router();

SaleRouter.post("/sales/add-sale", addSale);
SaleRouter.get("/sales/sales", getAllSales);
SaleRouter.delete("/sales/:saleId", removeSale);

export default SaleRouter;
