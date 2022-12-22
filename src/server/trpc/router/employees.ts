import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Role } from '../../../utils/utils'

import { router, protectedProcedure } from '../trpc'

export const employeesRouter = router({
  register: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        roleName: z.string(),
        email: z.string().email({ message: 'Formato de e-mail inválido.' }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user.role || ctx.session.user.role.hierarchy < Role.Administrativo) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const role = await ctx.prisma.role.findUnique({ where: { name: input.roleName } })

      if (!role) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return ctx.prisma.user.create({
        data: { name: input.name, email: input.email, role: { connect: { id: role.id } } },
      })
    }),
})
