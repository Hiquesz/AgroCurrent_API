import { Router } from 'express'
import ArrivalImagesController from '../../controllers/images/arrivalImages.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const imagesARoutes = Router()

imagesARoutes.post('/:arrivalId', authMiddleware, ArrivalImagesController.store)
imagesARoutes.get('/:arrivalId', authMiddleware, ArrivalImagesController.show)
imagesARoutes.delete('/:arrivalId', authMiddleware, ArrivalImagesController.delete)

export default imagesARoutes