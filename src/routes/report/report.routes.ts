import { Router } from 'express'
import ReportController from '../../controllers/report/report.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const reportRoutes = Router()

reportRoutes.post('/', authMiddleware, ReportController.store)
//reportRoutes.get('/:id', authMiddleware, ReportController.index)
reportRoutes.get('/:id', authMiddleware, ReportController.show)
reportRoutes.delete('/:id', authMiddleware, ReportController.delete)

export default reportRoutes