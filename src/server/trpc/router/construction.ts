import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Role, ZOD_UF_ENUM } from '../../../utils/utils'

import { router, protectedProcedure, isUserAuthorized } from '../trpc'

export const roleRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        UF: ZOD_UF_ENUM,
        workersId: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isUserAuthorized(ctx, Role.Administrativo)) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const { name, UF, workersId } = input

      await ctx.prisma.construction.create({
        data: {
          name,
          UF,
          workers: {
            connect: workersId.map((workerId) => ({ id: workerId })),
          },
        },
      })

      return {
        successfulMessage: 'Obra criada.',
      }
    }),
})
