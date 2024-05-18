import { Router } from 'express'
import SensorController from '../../controllers/sensor/sensor.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const sensorRoutes = Router()

sensorRoutes.post('/', authMiddleware, SensorController.store)
//sensorRoutes.get('/:id', authMiddleware, SensorController.index)
sensorRoutes.get('/:id', authMiddleware, SensorController.show)
sensorRoutes.delete('/:id', authMiddleware, SensorController.delete)
sensorRoutes.put('/:id', authMiddleware, SensorController.update)

export default sensorRoutes