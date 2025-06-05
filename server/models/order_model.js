import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    orderId: {
        type: String,
        required: [true, "Provide orderId"],
        unique: true
    },
    product_details: {
        type: Object,
        default: "",
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    payment_id: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        default: ""
    },
},{
    timestamps: true
})

const OrderModel = mongoose.model('Order',orderSchema);

export default OrderModel