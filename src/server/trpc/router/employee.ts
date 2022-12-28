import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Role } from '../../../utils/utils'

import { router, protectedProcedure } from '../trpc'

export const employeeRouter = router({
  register: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email({ message: 'Formato de e-mail inválido.' }),
        roleId: z.string(),
        CPF: z.string(),
        admissionDate: z.date(),
        pixKey: z.string().nullish(),
        bank: z.string().nullish(),
        agency: z.string().nullish(),
        account: z.string().nullish(),
        operation: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userSession = ctx.session.user

      const user = await ctx.prisma.user.findUniqueOrThrow({ where: { id: userSession.id }, select: { roles: true } })
      const userRole = user.roles[0]

      const { name, email, roleId, CPF, admissionDate, pixKey, bank, agency, account, operation } = input

      if (!userRole || userRole.hierarchy < Role.Administrativo) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const userBeingRegisteredRole = await ctx.prisma.role.findUnique({ where: { id: roleId } })

      if (!userBeingRegisteredRole || userRole.hierarchy < userBeingRegisteredRole.hierarchy) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      await ctx.prisma.user.create({
        data: {
          name,
          email,
          CPF,
          admissionDate,
          pixKey,
          bank,
          agency,
          account,
          operation,
          roles: { connect: { id: userBeingRegisteredRole.id } },
        },
      })

      return {
        successfulMessage: 'Funcionário cadastrado.',
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userSession = ctx.session.user

    const user = await ctx.prisma.user.findUniqueOrThrow({ where: { id: userSession.id }, select: { roles: true } })
    const userRole = user.roles[0]

    if (!userRole || userRole.hierarchy < Role.Administrativo) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return ctx.prisma.user.findMany({ include: { roles: true } })
  }),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userSession = ctx.session.user

      const user = await ctx.prisma.user.findUniqueOrThrow({ where: { id: userSession.id }, select: { roles: true } })
      const userRole = user.roles[0]

      if (!userRole || userRole.hierarchy < Role.Administrativo) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const { id } = input

      return ctx.prisma.user.findUnique({ where: { id }, include: { roles: true } })
    }),
})
