import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Role } from '../../../utils/utils'

import { router, protectedProcedure, isUserAuthorized } from '../trpc'

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
      if (!isUserAuthorized(ctx, Role.Administrativo)) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const { name, email, roleId, CPF, admissionDate, pixKey, bank, agency, account, operation } = input
      const userRole = ctx.session.user.roles[0]

      const userBeingRegisteredRole = await ctx.prisma.role.findUniqueOrThrow({ where: { id: roleId } })

      if (!userRole || userRole.hierarchy < userBeingRegisteredRole.hierarchy) {
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
    if (!isUserAuthorized(ctx, Role.Administrativo)) {
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
      if (!isUserAuthorized(ctx, Role.Administrativo)) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const { id } = input

      const employee = await ctx.prisma.user.findUniqueOrThrow({
        where: { id },
        include: {
          roles: true,
          variableMoney: true,
          discounts: true,
          constructions: true,
          receivedMoneyInAdvance: true,
          overTimeWork: {
            include: { overTimeInfo: true },
          },
        },
      })

      return employee
    }),
})
