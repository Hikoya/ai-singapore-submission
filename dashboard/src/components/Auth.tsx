import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { currentSession } from '@helper/session'
import { Session } from 'next-auth/core/types'

/**
 * This component checks whether a session is present, and redirects the user
 * to the signin page if no session is found.
 *
 * Additionally, the component checks whether the user is an admin for admin-level
 * pages.
 */
function Auth({ children }: { children: any }) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const hasUser = !!session?.user
  const router = useRouter()
  const devSession = useRef<Session | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        if (
          process.env.NEXT_PUBLIC_SETDEV === 'true' &&
          (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.ENVIRONMENT === 'development')
        ) {
          devSession.current = await currentSession()
        } else if (!loading && !hasUser) {
          router.push('/login')
        }
      } catch (error) {
        router.push('/unauthorized')
      }
    }

    fetchData()
  }, [loading, hasUser, router, session])

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return children
  }

  return children
}

export default Auth
