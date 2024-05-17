import { Router } from 'express'
import arrivalRoutes from './arrival/arrival.routes'
import authRoutes from './auth/auth.routes'
import departureRoutes from './departure/departure.routes'
import machineRoutes from './machine/machine.routes'
import reportRoutes from './report/report.routes'
import sensorRoutes from './sensor/sensor.routes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/machine', machineRoutes)
routes.use('/departure', departureRoutes)
routes.use('/arrival', arrivalRoutes)
routes.use('/sensor', sensorRoutes)
routes.use('/report', reportRoutes)

export default routes