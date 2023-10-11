import mongoose from "mongoose";

const userModel = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		inventoryItems: {},
	},
	{ timestamps: true }
);

export default mongoose.model("users", userModel);
