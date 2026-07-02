import mongoose, { Schema, Types, model, models } from "mongoose";

const MaintenanceRequestSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    rental: {
      type: Types.ObjectId,
      ref: "Rental",
      required: true,
      index: true,
    },

    issueType: {
      type: String,
      enum: [
        "DAMAGE",
        "NOT_WORKING",
        "INSTALLATION",
        "PICKUP",
        "OTHER",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    priority: {
      type: String,
      enum: [
        "LOW",
        "MEDIUM",
        "HIGH",
      ],
      default: "MEDIUM",
    },

    status: {
      type: String,
      enum: [
        "OPEN",
        "ASSIGNED",
        "IN_PROGRESS",
        "RESOLVED",
        "CLOSED",
      ],
      default: "OPEN",
      index: true,
    },

    assignedTo: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },

    resolutionNote: {
      type: String,
      default: "",
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

MaintenanceRequestSchema.index({ rental: 1 });
MaintenanceRequestSchema.index({ user: 1 });
MaintenanceRequestSchema.index({ status: 1 });

export default models.MaintenanceRequest ||
  model("MaintenanceRequest", MaintenanceRequestSchema);