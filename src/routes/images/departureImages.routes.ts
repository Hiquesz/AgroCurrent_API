import { Router } from 'express'
import DepartureImagesController from '../../controllers/images/departureImages.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const imagesDRoutes = Router()

imagesDRoutes.post('/:departureId', authMiddleware, DepartureImagesController.store)
imagesDRoutes.get('/:departureId', authMiddleware, DepartureImagesController.show)
imagesDRoutes.delete('/:departureId', authMiddleware, DepartureImagesController.delete)

export default imagesDRoutes