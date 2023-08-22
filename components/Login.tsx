import { signInWithGoogle } from '@/utils/signInWithGoogle'
import styles from '../styles/components/Login.module.scss'

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <h1>Todos</h1>
        <button className='textButton' onClick={() => signInWithGoogle()}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
