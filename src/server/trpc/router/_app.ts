import { router } from '../trpc'
import { authRouter } from './auth'
import { constructionRouter } from './construction'
import { employeeRouter } from './employee'
import { exampleRouter } from './example'
import { roleRouter } from './role'

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  employee: employeeRouter,
  role: roleRouter,
  construction: constructionRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
