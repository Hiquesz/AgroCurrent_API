import { Router } from 'express'
import MachineController from '../../controllers/machine/machine.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const machineRoutes = Router()

machineRoutes.post('/', authMiddleware, MachineController.store)
//machineRoutes.get('/:id', authMiddleware, MachineController.index)
machineRoutes.get('/:id', authMiddleware, MachineController.show)
machineRoutes.delete('/:id', authMiddleware, MachineController.delete)
machineRoutes.put('/:id', authMiddleware, MachineController.update)

export default machineRoutes