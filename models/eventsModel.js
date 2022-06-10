const mongoose = require("mongoose");


const eventsSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          required: [true, "Campo título deve ser preenchido"],
        },
        date: {
          type: String,
          required: [true, "Campo data deve ser preenchido"],
        }
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model("event", eventsSchema);