import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

import { type Context } from './context'

import { Role } from '../../utils/utils'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const router = t.router

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed)

// TODO: I think it can be better with trpc middleware
/**
 * Verify if the user is authorized to call that router
 * @param ctx Context
 * @param necessaryRoleLevel - 0: impossible to access the system; 1: Apontador; 2: Administrativo; 3: CEO
 */
export async function isUserAuthorized(ctx: Context, necessaryRoleLevel: number) {
  if (!ctx.session || !ctx.session.user) {
    return false
  }

  const userSession = ctx.session.user

  const user = await ctx.prisma.user.findUniqueOrThrow({ where: { id: userSession.id }, select: { roles: true } })
  const userRole = user.roles[0]

  if (!userRole || userRole.hierarchy < necessaryRoleLevel) {
    return false
  }

  return true
}
