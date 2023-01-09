import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { calculateSalary } from '../../../utils/functions'
import { Role as RoleEnum } from '../../../utils/types'

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
      if (!isUserAuthorized(ctx, RoleEnum.Administrativo)) {
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
    if (!isUserAuthorized(ctx, RoleEnum.Administrativo)) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    const employees = await ctx.prisma.user.findMany({
      include: {
        roles: true,
        receivedVariableValue: true,
        discounts: true,
        constructions: true,
        receivedMoneyInAdvance: true,
        overTimeWork: {
          include: { overTimeInfo: true },
        },
      },
    })

    const employeesWithSalary = employees.map((employee) => {
      const salary = calculateSalary(employee)

      return { ...employee, salary }
    })

    return employeesWithSalary
  }),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!isUserAuthorized(ctx, RoleEnum.Administrativo)) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const { id } = input

      // TODO: Maybe it's too much data to return
      // Like, after months/years, there'll be so much eg. variableMoney that it will slow down response.
      // So maybe the best to do is to return only the necessary here and return eg. variableMoney only
      // months that frontend needs, like a selector for a specific month

      // FIX: 'employee' implicitly has 'any' type. TS Server is really crazy here. Works when it wants.
      // The error occur when there are so many includes
      // TODO: investigate performance on this query
      // I don't know if it's faster to write multiple findUnique with only one select
      // or it's better to findUnique with select: { id: true } and multiple includes.
      // I'm doing this way only because TS gives me error on typing when there are
      // multiple includes in just one findUnique. So, that was the way I managed to
      // get rid of this error.
      // The above commentary is no longer valid
      const employee = await ctx.prisma.user.findUniqueOrThrow({
        where: { id },
        include: {
          roles: true,
          receivedVariableValue: true,
          discounts: true,
          constructions: true,
          receivedMoneyInAdvance: true,
          overTimeWork: {
            include: { overTimeInfo: true },
          },
        },
      })

      const salary = calculateSalary(employee)

      return { ...employee, salary }
    }),
})
