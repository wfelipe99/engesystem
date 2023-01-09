import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Role, ZOD_UF_ENUM } from '../../../utils/types'

import { router, protectedProcedure, isUserAuthorized } from '../trpc'

export const roleRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userRole = ctx.session.user.roles[0]

    if (!isUserAuthorized(ctx, Role.Administrativo) || !userRole) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    let roles = await ctx.prisma.role.findMany()
    roles = roles.filter((role) => role.hierarchy <= userRole.hierarchy)

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
      if (!isUserAuthorized(ctx, Role.Administrativo)) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const { name, UF, salary } = input

      await ctx.prisma.role.create({ data: { name, UF, salary, hierarchy: 0 } })

      return {
        successfulMessage: 'Função criada.',
      }
    }),
})
