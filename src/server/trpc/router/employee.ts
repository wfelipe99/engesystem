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

      const userRoles = await ctx.prisma.user.findUnique({ where: { id: user.id }, select: { roles: true } })
      console.log(userRoles)

      if (!userRoles || !userRoles.roles[0] || userRoles.roles[0].hierarchy < Role.Administrativo) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const userBeingRegisteredRole = await ctx.prisma.role.findUnique({ where: { name: input.roleName } })

      if (!userBeingRegisteredRole || userRoles.roles[0].hierarchy < userBeingRegisteredRole.hierarchy) {
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
          roles: { connect: { id: userBeingRegisteredRole.id } },
        },
      })

      return {
        successfulMessage: 'Funcionário cadastrado.',
      }
    }),
})
