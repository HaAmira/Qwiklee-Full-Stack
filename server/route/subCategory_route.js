import {Router} from 'express'
import auth from '../middleware/auth.js'
import { AddSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from '../controller/subCategory_controller.js'

const subcategoryRouter = Router()

subcategoryRouter.post('/create',auth,AddSubCategoryController)
subcategoryRouter.get('/get',getSubCategoryController)
subcategoryRouter.put('/update',auth,updateSubCategoryController)
subcategoryRouter.delete('/delete',auth,deleteSubCategoryController)


export default subcategoryRouter