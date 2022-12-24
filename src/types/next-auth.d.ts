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
  interface Session {
    user?: UserPrisma & DefaultSession['user']
  }

  type User = UserPrisma
  /*interface User extends UserPrisma {
    roleId: string
    role: Role | null
  }*/
}
