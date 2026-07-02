import mongoose, { Schema, Types, model, models } from "mongoose";

const RentalSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    order: {
      type: Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },

    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    monthlyRent: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      required: true,
    },

    rentalTenure: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    actualReturnDate: {
      type: Date,
      default: null,
    },

    extensionCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "UPCOMING",
        "ACTIVE",
        "EXTENDED",
        "RETURN_REQUESTED",
        "RETURNED",
        "CANCELLED",
      ],
      default: "UPCOMING",
      index: true,
    },

    damageStatus: {
      type: String,
      enum: [
        "NONE",
        "MINOR",
        "MAJOR",
      ],
      default: "NONE",
    },

    damageCharges: {
      type: Number,
      default: 0,
    },

    maintenanceRequired: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

RentalSchema.index({ user: 1 });
RentalSchema.index({ product: 1 });
RentalSchema.index({ status: 1 });
RentalSchema.index({ startDate: 1 });
RentalSchema.index({ endDate: 1 });

export default models.Rental ||
  model("Rental", RentalSchema);