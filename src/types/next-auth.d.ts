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
  // TODO: type it correctly so [...nextauth].ts can use it correctly

  // 1: Define a type that includes the relation to `Post`
  const userWithRoles = Prisma.validator<Prisma.UserArgs>()({
    include: { roles: true },
  })

  // 3: This type will include a user and all their posts
  type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>

  interface Session {
    user?: UserWithRoles & DefaultSession['user']
  }

  type User = UserWithRoles
  /*interface User extends UserPrisma {
    roleId: string
    role: Role | null
  }*/
}
