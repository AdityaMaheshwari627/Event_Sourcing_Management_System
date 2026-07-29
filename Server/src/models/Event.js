const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        aggregateId: {
            type: String,
            required: true,
        },

        aggregateType: {
            type: String,
            default: "Task",
        },

        eventType: {
            type: String,
            required: true,
        },

        payload: {
            type: Object,
            required: true,
        },

        version: {
            type: Number,
            default: 1,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Event", eventSchema);