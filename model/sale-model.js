import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
	{
		amount: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("sales", saleSchema);
