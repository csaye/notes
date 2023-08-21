import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { UserData } from './types'

export async function signInWithGoogle(): Promise<UserData> {
  const auth = getAuth()
  const db = getFirestore()
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)

  const { uid, displayName, email } = auth.currentUser ?? {}
  if (!uid || !displayName || !email) {
    throw new Error('User not authenticated')
  }

  const userDocRef = doc(db, 'users', uid)
  const userDoc = await getDoc(userDocRef)
  if (userDoc.exists()) {
    return userDoc.data() as UserData
  }

  const userData: UserData = {
    uid,
    name: displayName,
    email,
    joined: Date.now(),
  }
  await setDoc(userDocRef, userData)
  return userData
}
