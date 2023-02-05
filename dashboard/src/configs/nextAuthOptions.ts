import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@helper/db'
import CredentialsProvider from 'next-auth/providers/credentials'

import { User } from 'types/user'
import { NextAuthOptions, Session, SessionStrategy } from 'next-auth'
import { checkerString } from '@helper/common'

const strat: SessionStrategy = 'jwt'

/**
 * Options for the Next-Auth library, including all the callbacks to
 * authenticate users and send login emails to the user.
 */
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        id: {
          type: 'text',
          placeholder: 'id'
        },
        username: {
          label: 'email',
          type: 'text',
          placeholder: 'testuser@test.com'
        },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const userFromDB: User = await prisma.user.findFirst({
            where: {
              email: credentials?.username,
              password: credentials?.password
            }
          })

          if (userFromDB) {
            const data = {
              id: userFromDB.id as string,
              email: userFromDB.email
            }

            return data
          } else {
            return null
          }
        } catch (error) {
          console.error(error)

          return null
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: strat,
    maxAge: 1 * 24 * 60 * 60 // 1 day
  },
  pages: {
    signIn: '/signin',
    error: '/error',
    verifyRequest: '/verify-request'
  },
  callbacks: {
    async signIn({ user, email }) {
      let isAllowedToSignIn = true

      try {
        if (
          email !== undefined &&
          email !== null &&
          (Object.prototype.hasOwnProperty.call(email, 'verificationRequest') as boolean)
        ) {
          isAllowedToSignIn = false
          const email: string = (user.email as string).trim().toLowerCase()

          if (checkerString(email)) {
            const doesUserExist = await prisma.user.findUnique({
              where: {
                email
              }
            })

            if (doesUserExist !== null) {
              isAllowedToSignIn = true
            }
          }
        }

        if (isAllowedToSignIn) {
          return true
        }
      } catch (error) {
        console.error(error)
      }

      return '/unauthorized'
    },
    async session({ session, user }) {
      try {
        if (session.user.name === null || session.user.name === undefined) {
          let userFromDB: User | null = null

          if (user !== undefined) {
            userFromDB = await prisma.user.findUnique({
              where: {
                email: user.email
              }
            })
          } else {
            userFromDB = await prisma.user.findUnique({
              where: {
                email: session.user.email
              }
            })
          }

          if (userFromDB != null) {
            const newSession: Session = JSON.parse(JSON.stringify(session))
            newSession.user.email = userFromDB.email
            newSession.user.name = userFromDB.name

            return newSession
          }
        } else {
          return session
        }
      } catch (error) {
        console.error(error)
      }

      return session
    }
  }
}
