import { Prisma } from '@prisma/client'
import type { DetailedSalary, UserWithSalaryInfo } from './types'

const Decimal = Prisma.Decimal.clone({ precision: 4, rounding: Prisma.Decimal.ROUND_DOWN })

// Month in JavaScript is 0-indexed (January is 0, February is 1, etc),
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
export function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate()
}

export function calculateSalary(employee: UserWithSalaryInfo): DetailedSalary {
  // employee.roles[0] it's not possibily undefined because there'll be no way to delete a role from a worker
  // I couldn't make a mandatory one-to-one relationship because the way prisma works, so it had to be
  // a many-to-many relationship.
  const grossSalary = employee.productionSalary ?? employee.roles[0]!.salary

  const totalDiscountPercent =
    employee.discounts.length === 0
      ? new Decimal('0')
      : Decimal.sum(...employee.discounts.map(({ percentOnSalary }) => percentOnSalary))
  const discount = grossSalary.times(totalDiscountPercent)

  const bonus =
    employee.receivedVariableValue.length === 0
      ? new Decimal('0')
      : Decimal.sum(...employee.receivedVariableValue.map(({ bonus }) => bonus))

  const moneyInAdvance =
    employee.receivedMoneyInAdvance.length === 0
      ? new Decimal('0')
      : Decimal.sum(...employee.receivedMoneyInAdvance.map(({ value }) => value))

  const overTime =
    employee.overTimeWork.length === 0
      ? new Decimal('0')
      : Decimal.sum(
          ...employee.overTimeWork.map((o) => {
            const percentOnWorkedHour = new Decimal(o.overTimeInfo.percentOnWorkedHour)
            const roleSalary = employee.roles[0]!.salary
            const workedHourValueBasedOnPercent = percentOnWorkedHour.times(roleSalary.dividedBy('220'))
            const overTimeWorkedMoney = workedHourValueBasedOnPercent.times(String(o.hours))

            return overTimeWorkedMoney
          })
        )

  const vale = employee.vale ?? new Decimal('0')

  const netSalary = grossSalary.add(bonus).add(overTime).minus(vale).minus(moneyInAdvance).minus(discount)

  return { grossSalary, netSalary, vale, bonus, moneyInAdvance, overTime, discount }
}
