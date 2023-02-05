import { Session } from 'next-auth/core/types'
import { options } from '@config/nextAuthOptions'
import { unstable_getServerSession } from 'next-auth/next'

/**
 * Retrieves the current session. This function is used for server-side code
 * If development, mocks a fake session and returns the session.
 *
 * @return a Promise containing a Result
 */
export const currentSession = async (
  request: any = null,
  response: any = null,
  context: any = null,
  server = true
): Promise<Session | null> => {
  if (process.env.NEXT_PUBLIC_SETDEV === 'true' && (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')) {
    let session: Session | null = null
    session = {
      expires: '1',
      user: {
        name: 'Test user',
        email: 'testing@test.com'
      }
    }

    return session
  } else {
    let session: Session | null = null
    if (server && context !== null) {
      session = (await unstable_getServerSession(context.req, context.res, options)) as Session

      return session
    } else if (server && request !== null && response !== null) {
      session = (await unstable_getServerSession(request, response, options)) as Session

      return session
    } else {
      return null
    }
  }
}
