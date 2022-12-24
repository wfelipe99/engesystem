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
        roleName: z.string(),
        CPF: z.string(),
        admissionDate: z.date(),
        UF: z.string(),
        pixKey: z.string().nullish(),
        bank: z.string().nullish(),
        agency: z.string().nullish(),
        account: z.string().nullish(),
        operation: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user

      if (!user.role || user.role.hierarchy < Role.Administrativo) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const userBeingRegisteredRole = await ctx.prisma.role.findUnique({ where: { name: input.roleName } })
      console.log(userBeingRegisteredRole)

      if (!userBeingRegisteredRole || user.role.hierarchy < userBeingRegisteredRole.hierarchy) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const { name, email, CPF, admissionDate, UF, pixKey, bank, agency, account, operation } = input

      // FIX: It's not creating the user
      await ctx.prisma.user.create({
        data: {
          name,
          email,
          CPF,
          admissionDate,
          UF,
          pixKey,
          bank,
          agency,
          account,
          operation,
          role: {
            connect: { id: userBeingRegisteredRole.id },
          },
        },
      })

      return {
        successfulMessage: 'Funcionário cadastrado.',
      }
    }),
})
