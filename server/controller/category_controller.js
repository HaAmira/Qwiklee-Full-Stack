import CategoryModel from "../models/category_model.js";
import ProductModel from "../models/product_model.js"
import SubCategoryModel from "../models/subCategory_model.js";


export async function AddCategoryController(request,response) {
    try{
        const {name,image} = request.body

        if(!name || !image){
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: true
            })
        }
        const addCategory = new CategoryModel({
            name,
            image
        })
        
        const saveCategory = await addCategory.save()

        if(!saveCategory){
            return response.status(500).json({
                message: "Not Created",
                error : true,
                success : false
            })
        }
        return response.json({
            message: "Add Created",
            data : saveCategory, 
            error : false,
            success : true
        })

    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCategoryController = async(request,response)=>{
    try{
        const data = await CategoryModel.find().sort({ createdAt : -1})

        return response.json({
            data : data,
            error : false,
            success : true
        })
    }catch (error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateCategoryController = async(request,response)=>{
    try{
        const { _id,name,image } = request.body

        const update = await CategoryModel.updateOne({
            _id : _id
        },{
            name,
            image
        })

        return response.json({
            message : "Update Category",
            data : update,
            error : false,
            success : true
        })
    }catch (error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteCategoryController = async(request,response)=>{
    try{
        const { _id } = request.body
        
        const checkSubCategory = await SubCategoryModel.find({
            Category : {
                "$in" : [ _id ]
            }
        }).countDocuments()
        
        const checkProduct = await ProductModel.find({
            Category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

        if(checkSubCategory>0 || checkProduct>0){
            return response.json({
                message: "Category is alredy use can't delete",
                error: true,
                success: false
            })
        }

        const deleteCategory = await CategoryModel.deleteOne({ _id })

        return response.json({
            message: "Delete category successfully",
            data: deleteCategory,
            error: false,
            success: true
        })
        

    }catch{
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}