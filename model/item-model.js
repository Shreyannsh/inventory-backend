import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("items", ItemSchema);
