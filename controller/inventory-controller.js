import { ErrorMassges, SuccessMassages } from "../const/message.js";
import asyncHandler from "../handler/catchAsync.js";
import ErrorResponse from "../handler/error.js";
import itemModel from "../model/item-model.js";
import mongoose from "mongoose";
import saleModel from "../model/sale-model.js";

//@desc Add new item in the list
//Route POST /v1/api/items/add-item

export const AddItem = asyncHandler(async (req, res, next) => {
	const { itemName, quantity, price } = req.body;
	try {
		if (!itemName || !quantity || !price) {
			return next(new ErrorResponse(ErrorMassges.MISSING_FIELDS, 400));
		}
		const newItems = new itemModel({
			name: itemName,
			quantity: quantity,
			price: price,
		});
		await newItems.save();
		return res.status(200).json({
			message: SuccessMassages.SUCCESSFULLY_CREATED,
			success: true,
			data: newItems,
		});
	} catch (error) {
		return next(new ErrorResponse(error.message, 500));
	}
});

//@desc Retrive all items
//Route POST /v1/api/items/items

export const getItems = asyncHandler(async (req, res, next) => {
	try {
		const foundItems = await itemModel.find();
		return res.status(200).json({
			message: SuccessMassages.GETTED_DATA,
			success: true,
			data: foundItems,
		});
	} catch (error) {
		return next(new ErrorResponse(error.message, 500));
	}
});

//@desc Delete A specific item by its ID
//Route DELETE /v1/api/items/:itemId

export const removeItem = asyncHandler(async (req, res, next) => {
	const { itemId } = req.params;
	try {
		if (!itemId) {
			return next(new ErrorResponse(ErrorMassges.MISSING_FIELDS, 400));
		}
		const deleted = await itemModel.findByIdAndDelete({ _id: itemId });
		if (!deleted) {
			return next(new ErrorResponse("No Item Found", 404));
		}

		return res.status(204).json({
			message: SuccessMassages.ITEM_REMOVE,
			success: true,
		});
	} catch (error) {
		return next(new ErrorResponse(error.message, 500));
	}
});

//@desc update A specific item by its ID
//Route post /v1/api/items/:itemId/update

export const updateItem = asyncHandler(async (req, res, next) => {
	const { itemId } = req.params;
	const { itemName, quantity, price } = req.body;
	try {
		//check itemId is mongooes id  valid or not
		if (!mongoose.Types.ObjectId.isValid(itemId)) {
			return next(new ErrorResponse(ErrorMassges.INVALID_ID, 400));
		}
		if (!itemName || !quantity || !price) {
			return next(new ErrorResponse(ErrorMassges.MISSING_FIELDS, 400));
		}
		const findAndUpdate = await itemModel.findByIdAndUpdate(
			{ _id: itemId },
			{
				$set: {
					name: itemName,
					quantity: quantity,
					price: price,
				},
			},
			{
				new: true,
			}
		);
		return res.status(200).json({
			message: SuccessMassages.ITEM_UPDATED,
			success: false,
			data: findAndUpdate,
		});
	} catch (error) {
		return next(new ErrorResponse(error.message, 500));
	}
});

//@desc adding  sales
//Route post /v1/api/sales/add-sale

export const addSale = asyncHandler(async (req, res, next) => {
	const { name, price, quantity } = req.body;
	try {
		if (!name || !price || !quantity) {
			return next(new ErrorResponse(ErrorMassges.MISSING_FIELDS, 400));
		}
		const newSale = new saleModel({
			name: name,
			quantity: quantity,
			price: price,
		});
		await newSale.save();
		res.status(200).json({
			message: SuccessMassages.SALE_ADDED,
			success: true,
			data: newSale,
		});
	} catch (error) {
		return next(new ErrorResponse(error.message, 500));
	}
});

//@desc get all   sales
//Route GET /v1/api/sales/sales

export const getAllSales = asyncHandler(async (req, res, next) => {
	try {
		const result = await saleModel.find();
		return res.status(200).json({
			message: SuccessMassages.GETTED_DATA,
			success: true,
			data: result,
		});
	} catch (error) {
		return next(new ErrorResponse(error.message, 500));
	}
});

//@desc delete a sale from sales list
//Route DELETE /v1/api/sales/:saleId

export const removeSale = asyncHandler(async (req, res, next) => {
	const { saleId } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(saleId)) {
			return next(new ErrorResponse(ErrorMassges.INVALID_ID, 404));
		}
		const deleteed = await saleModel.findByIdAndDelete({ _id: saleId });
		if (!deleteed) {
			return next(new ErrorResponse(`No Sale with id ${saleId}`, 404));
		}

		return res.status(200).json({
			message: SuccessMassages.ITEM_REMOVE,
			success: true,
			data: deleteed,
		});
	} catch (error) {
		return next(new ErrorResponse("something went wrong", 500));
	}
});