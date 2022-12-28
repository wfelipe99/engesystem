import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Role, ZOD_UF_ENUM } from '../../../utils/utils'

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

    const statesUFUnique = new Set<string>()
    const rolesNamesUnique = new Set<string>()

    for (const role of roles) {
      statesUFUnique.add(role.UF)
      rolesNamesUnique.add(role.name)
    }

    return {
      statesUF: Array.from(statesUFUnique),
      rolesNames: Array.from(rolesNamesUnique),
      roles,
    }
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        UF: ZOD_UF_ENUM,
        salary: z.coerce.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userSession = ctx.session.user

      const user = await ctx.prisma.user.findUniqueOrThrow({ where: { id: userSession.id }, select: { roles: true } })
      const userRole = user.roles[0]

      const { name, UF, salary } = input

      if (!userRole || userRole.hierarchy < Role.Administrativo) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      await ctx.prisma.role.create({ data: { name, UF, salary, hierarchy: 0 } })

      return {
        successfulMessage: 'Função criada.',
      }
    }),
})
