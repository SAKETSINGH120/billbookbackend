const mongoose = require("mongoose");
const { Schema } = mongoose;

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("Banner", bannerSchema);
