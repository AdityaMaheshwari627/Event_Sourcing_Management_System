const mongoose = require("mongoose");
const EVENT_TYPES = require("../constants/eventTypes");

const eventSchema = new mongoose.Schema(
  {
    aggregateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
      index: true,
    },

    aggregateType: {
      type: String,
      default: "Account",
    },

    eventType: {
      type: String,
      required: true,
      enum: Object.values(EVENT_TYPES),
    },

    payload: {
      type: Object,
      required: true,
    },

    version: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Composite index for fast replay
eventSchema.index({
  aggregateId: 1,
  version: 1,
});

module.exports = mongoose.model("Event", eventSchema);