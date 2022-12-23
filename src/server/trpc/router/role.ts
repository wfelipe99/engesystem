import { TRPCError } from '@trpc/server'
import { Role } from '../../../utils/utils'

import { router, protectedProcedure } from '../trpc'

export const roleRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.role || ctx.session.user.role.hierarchy < Role.Administrativo) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    let roles = await ctx.prisma.role.findMany()
    roles = roles.filter((role) => role.hierarchy <= (ctx.session.user.role?.hierarchy as number))

    return roles
  }),
})
