const mongoose = require("mongoose");

const MedicineDetailSchema = new mongoose.Schema(
    {
        brekafast: Integer,
        lunch: Integer,
        dinner: Integer,
        name: String,
        priority: Integer,
        duration: Integer,
        frequency: Integer,
    },

    {
        collection: "MedicineInfo",
    }
);

module.exports=mongoose.model("MedicineInfo", MedicineDetailSchema);