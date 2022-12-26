import type { User as UserPrisma, Role, Prisma } from '@prisma/client'
import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  /*interface Session {
    user?: {
      id: string
      roleId: string
      role: Role | null
    } & DefaultSession['user']
  }*/
  const userWithRoles = Prisma.validator<Prisma.UserArgs>()({
    include: { roles: true },
  })

  export type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>

  interface Session {
    user?: UserWithRoles & DefaultSession['user']
  }

  type User = UserWithRoles
  /*interface User extends UserPrisma {
    roleId: string
    role: Role | null
  }*/
}
