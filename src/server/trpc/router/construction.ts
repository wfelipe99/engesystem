import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Role, ZOD_UF_ENUM } from '../../../utils/utils'

import { router, protectedProcedure, isUserAuthorized } from '../trpc'

export const constructionRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        UF: ZOD_UF_ENUM,
        workersId: z.array(
          z.object({
            id: z.string(),
          })
        ),
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
            connect: workersId,
          },
        },
      })

      return {
        successfulMessage: 'Obra criada.',
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!isUserAuthorized(ctx, Role.Administrativo)) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return ctx.prisma.construction.findMany()
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

      return ctx.prisma.construction.findUniqueOrThrow({ where: { id } })
    }),
})
