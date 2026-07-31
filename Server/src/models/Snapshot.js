const mongoose = require("mongoose");

const snapshotSchema = new mongoose.Schema(
  {
    aggregateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },

    aggregateType: {
      type: String,
      required: true,
      default: "Account",
    },

    version: {
      type: Number,
      required: true,
    },

    state: {
      accountNumber: String,
      accountType: String,
      balance: Number,
      status: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Snapshot", snapshotSchema);