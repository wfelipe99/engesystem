import { TRPCError } from '@trpc/server'
import { Role } from '../../../utils/utils'

import { router, protectedProcedure } from '../trpc'

export const roleRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user

    const userRoles = await ctx.prisma.user.findUnique({ where: { id: user.id }, select: { roles: true } })

    if (!userRoles || !userRoles.roles[0] || userRoles.roles[0].hierarchy < Role.Administrativo) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    let roles = await ctx.prisma.role.findMany()
    roles = roles.filter((role) => role.hierarchy <= (userRoles.roles[0]!.hierarchy as number))

    return roles
  }),
})
