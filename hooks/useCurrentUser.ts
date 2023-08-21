import { useEffect, useState } from 'react'
import { User, getAuth } from 'firebase/auth'

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>()

  const auth = getAuth()

  // listen for user auth state
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(() => {
      setUser(auth.currentUser)
    })
    return () => authListener()
  }, [auth])

  return user
}
