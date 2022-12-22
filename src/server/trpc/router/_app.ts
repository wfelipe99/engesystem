import { router } from '../trpc'
import { authRouter } from './auth'
import { employeesRouter } from './employees'
import { exampleRouter } from './example'

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  employees: employeesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
