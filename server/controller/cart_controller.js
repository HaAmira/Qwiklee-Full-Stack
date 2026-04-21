import CartProductModel from "../models/cartproduct_model.js";
import ProductModel from "../models/product_model.js";
import UserModel from "../models/user_model.js";

export const addToCartItemController = async (request, response) => {
    try {
        const userId = request.userId
        const { productId } = request.body

        if (!productId) {
            return response.status(402).json({
                message: "Provide productId",
                error: true,
                success: false
            })
        }

        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            productId: productId
        })

        if (checkItemCart) {
            return response.status(400).json({
                message: "Item already in cart"
            })
        }

        const ProductStock = await ProductModel.updateOne({ _id: productId }, {
            $inc: { stock: -1 }
        })

        const cartItem = new CartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        })
        const save = await cartItem.save();
        const saveCartItem = await save.populate('productId');

        const updateCartUser = await UserModel.updateOne({ _id: userId }, {
            $push: {
                shopping_cart: productId
            }
        })

        return response.json({
            data: save,
            message: "Item add successfully",
            error: false,
            success: true
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getCartItemController = async (request, response) => {
    try {
        const userId = request.userId

        const cartItem = await CartProductModel.find({
            userId: userId
        }).populate('productId')

        return response.json({
            data: cartItem,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateCartItemQtyController = async (request, response) => {
    try {
        const userId = request.userId
        const { _id, qty } = request.body

        if (!_id || !qty) {
            return response.status(400).json({
                message: "provide _id, qty"
            })
        }

        const checkCartItem = await CartProductModel.findOne({ _id, userId }).populate('productId');
        if (!checkCartItem) {
            return response.status(404).json({
                message: "cart item not found",
                error: true,
                success: false
            })
        }

        const oldQty = checkCartItem.quantity;
        const productId = checkCartItem.productId._id;
        const changeQty = qty - oldQty;

        if (changeQty > 0) {
            const product = await ProductModel.findOneAndUpdate({
                _id: productId,
                stock: { $gte: changeQty } // atomic check
            },
                {
                    $inc: { stock: -changeQty }
                },
                { new: true }
            );

            if (!product) {
                return response.status(400).json({
                    message: "Sorry this item is out of stock",
                    error: true,
                    success: false
                });

            }

        }

        if (changeQty < 0) {
            await ProductModel.updateOne(
                { _id: productId },
                {
                    $inc: {
                        stock: Math.abs(changeQty)
                    }
                }
            );

        }

        checkCartItem.quantity = qty;
        const updateCartitem = await checkCartItem.save();

        return response.json({
            message: "Update cart",
            success: true,
            error: false,
            data: updateCartitem
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteCartItemQtyController = async (request, response) => {
    try {
        const userId = request.userId // middleware
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            })
        }

        const checkCartItem = await CartProductModel.findOne({ _id, userId }).populate('productId');
        if (!checkCartItem) {
            return response.status(404).json({
                message: "cart item not found",
                error: true,
                success: false
            })
        }

        const productSock = await ProductModel.findByIdAndUpdate(checkCartItem.productId._id, {
            $inc: { stock: 1 }
        }, { new: true });

        const deleteCartItem = await CartProductModel.deleteOne({ _id: _id, userId: userId })

        return response.json({
            message: "Item remove",
            error: false,
            success: true,
            data: deleteCartItem
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}