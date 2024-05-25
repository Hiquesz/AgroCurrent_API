import { Router } from 'express'
import ArrivalController from '../../controllers/arrival/arrival.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const arrivalRoutes = Router()

//arrivalRoutes.post('/:id', authMiddleware, ArrivalController.store)
arrivalRoutes.get('/:departureId', authMiddleware, ArrivalController.index)
arrivalRoutes.get('/', authMiddleware, ArrivalController.show)
arrivalRoutes.delete('/:id', authMiddleware, ArrivalController.delete)
arrivalRoutes.put('/:id', authMiddleware, ArrivalController.update)

export default arrivalRoutes