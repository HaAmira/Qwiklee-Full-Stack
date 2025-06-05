import SubCategoryModel from "../models/subCategory_model.js"

export async function AddSubCategoryController(request,response) {
    try{
        const { name,image,category } = request.body
        if(!name || !image || !category[0]){
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: true
            })
        }

        const addSubCategory = new SubCategoryModel({
            name,
            image,
            category
        })

        const saveSubCategory = await addSubCategory.save()

        if(!saveSubCategory){
            return response.status(500).json({
                message: "Not Created",
                error : true,
                success : false
            })
        }
        return response.json({
            message: "Add SubCreated",
            data : saveSubCategory, 
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

export async function getSubCategoryController(request,response) {
    try{
        const data = await SubCategoryModel.find().sort({createdAt : -1}).populate('category')

        return response.json({
            data : data,
            error : false,
            success : true
        })
    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            error: true,
            success :true
        })
    }
}


export async function updateSubCategoryController(request,response) {
    try {
        const { _id, name, image,category } = request.body 

        const checkSub = await SubCategoryModel.findById(_id)
        // console.log("checkSub await SubCategoryModel.findById(_id)")
        if(!checkSub){
            return response.status(400).json({
                message : "Check your _id",
                error : true,
                success : false
            })
        }
        
        const updateSubCategory = await SubCategoryModel.updateOne({
            _id : _id
        },{
            name,
            image,
            category
        })
        // console.log("updateSubCategory",updateSubCategory)

        return response.json({
            message : 'Updated Successfully',
            data : updateSubCategory,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false 
        })
    }
}


export async function deleteSubCategoryController(request,response) {
    try{
        const { _id } = request.body

        const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(_id)

        return response.json({
            message : "Delete successfully",
            data : deleteSubCategory,
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