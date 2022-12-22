import type { Role } from '@prisma/client'
import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string
      roleId: string
      role: Role | null
    } & DefaultSession['user']
  }

  interface User {
    roleId: string
    role: Role | null
  }
}
