import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String, // Fixed typo: "tyoe" -> "type"
        default: ''
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category"
        }
    ]
}, {
    timestamps: true
});

const SubCategoryModel = mongoose.model('Subcategory', subCategorySchema);

export default SubCategoryModel;
