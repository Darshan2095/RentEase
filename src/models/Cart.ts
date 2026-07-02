import mongoose, { Schema, Types, model, models } from "mongoose";

const CartItemSchema = new Schema(
  {
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    rentalTenure: {
      type: Number,
      required: true,
    },

    monthlyRent: {
      type: Number,
      required: true,
      min: 0,
    },

    securityDeposit: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: true,
  }
);

const CartSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

CartSchema.index({ user: 1 });

export default models.Cart || model("Cart", CartSchema);