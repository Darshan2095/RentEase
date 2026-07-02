import mongoose, { Schema, Types, model, models } from "mongoose";

const WishlistSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    products: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

WishlistSchema.index({ user: 1 });

export default models.Wishlist ||
  model("Wishlist", WishlistSchema);