import NextAuth, { type NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { env } from '../../../env/server.mjs'
import { prisma } from '../../../server/db/client'

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id

        // TODO: remove this DB query
        // is it possible to not make this query since user is already returned?
        // I'd need only to include the role in query
        const userRoles = await prisma.user.findUnique({ where: { id: user.id }, select: { roles: true } })
        session.user.roles = (userRoles ?? { roles: [] }).roles
      }

      console.log(session)

      return session
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),
  ],
  debug: true,
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/autenticacao/entrar',
    verifyRequest: '/autenticacao/verifique-email',
  },
}

export default NextAuth(authOptions)
