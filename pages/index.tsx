import Login from '@/components/Login'
import styles from '@/styles/pages/Index.module.scss'
import { getAuth, signOut } from 'firebase/auth'

export default function Index() {
  const auth = getAuth()

  if (!auth.currentUser) {
    return <Login />
  }

  return (
    <div className={styles.container}>
      <h1>Notes</h1>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  )
}
