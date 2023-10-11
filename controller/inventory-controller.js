import { ErrorMassges, SuccessMassages } from "../const/message.js";
import asyncHandler from "../handler/catchAsync.js";
import ErrorResponse from "../handler/error.js";
import itemModel from "../model/item-model.js";
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
		await itemModel.findByIdAndDelete({ _id: itemId });

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
		if (!itemName || !quantity || !price || !itemId) {
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
	const { description, amount } = req.body;
	try {
		if (!description || !amount) {
			return next(new ErrorResponse(ErrorMassges.MISSING_FIELDS, 400));
		}
		const newSale = new saleModel({
			amount,
			description,
		});
		await newSale.save();
		res.status(200).json({
			message: SuccessMassages.SALE_ADDED,
			success: true,
			data: newSale,
		});
	} catch (error) {}
});
