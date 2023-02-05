// @ts-ignore
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: string
    user: {
      email: string
      name?: string
    } & DefaultSession['user']
  }
}
