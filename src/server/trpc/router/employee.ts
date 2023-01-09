import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Role as RoleEnum } from '../../../utils/utils'

import { router, protectedProcedure, isUserAuthorized } from '../trpc'
import type { Discount, MoneyInAdvance, OverTime, OverTimeWork, Role, User, VariableValue } from '@prisma/client'
import { Prisma } from '@prisma/client'
const Decimal = Prisma.Decimal.clone({ precision: 4, rounding: Prisma.Decimal.ROUND_UP })

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

    return ctx.prisma.user.findMany({ include: { roles: true } })
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

      const salary = calculateFinalSalary(employee)
      // console.log(
      //   `Vai receber ${workedHourMoney} por ter feito ${o.hours} horas de hora extra a ${percentOnWorkedHour}%`
      // )
      console.log(salary)

      return { ...employee, salary }
    }),
})

function calculateFinalSalary(
  employee: User & {
    roles: Role[]
    discounts: Discount[]
    receivedVariableValue: VariableValue[]
    receivedMoneyInAdvance: MoneyInAdvance[]
    overTimeWork: (OverTimeWork & {
      overTimeInfo: OverTime
    })[]
  }
): { finalSalary: Prisma.Decimal; totalValueOverTimeWork: Prisma.Decimal[] } {
  // employee.roles[0] it's not possibily undefined because there'll be no way to delete a role from a worker
  // I couldn't make a mandatory one-to-one relationship because the way prisma works, so it had to be
  // a many-to-many relationship.
  const grossSalary = employee.productionSalary ?? employee.roles[0]!.salary

  const totalDiscountPercent = Decimal.sum(...employee.discounts.map(({ percentOnSalary }) => percentOnSalary))
  const totalDiscountValue = grossSalary.times(totalDiscountPercent)

  const totalReceivedVariableValue = Decimal.sum(...employee.receivedVariableValue.map(({ bonus }) => bonus))

  const totalReceveidMoneyInAdvance = Decimal.sum(...employee.receivedMoneyInAdvance.map(({ value }) => value))

  const totalValueOverTimeWork = employee.overTimeWork.map((o) => {
    const percentOnWorkedHour = new Decimal(o.overTimeInfo.percentOnWorkedHour)
    const roleSalary = employee.roles[0]!.salary
    const workedHourValueBasedOnPercent = percentOnWorkedHour.times(roleSalary.dividedBy('220'))
    const workedHourMoney = workedHourValueBasedOnPercent.times(o.hours)

    return workedHourMoney
  })
  const valeValue = employee.vale ?? new Decimal('0')

  const finalSalary = grossSalary.minus(totalDiscountValue).minus(valeValue)

  return { finalSalary, totalValueOverTimeWork }
}

// Month in JavaScript is 0-indexed (January is 0, February is 1, etc),
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate()
}
