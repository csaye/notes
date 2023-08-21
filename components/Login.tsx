import { signInWithGoogle } from '@/utils/signInWithGoogle'
import styles from '../styles/components/Login.module.scss'

export default function Login() {
  return (
    <div className={styles.container}>
      <h1>Notes</h1>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </div>
  )
}
