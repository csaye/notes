import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import styles from '@/styles/pages/Index.module.scss'
import { signInWithGoogle } from '@/utils/signInWithGoogle'
import { getAuth, signOut } from 'firebase/auth'

export default function Index() {
  const auth = getAuth()
  const user = useCurrentUser()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Todos</h1>
        {user ? (
          <button className='textButton' onClick={() => signOut(auth)}>
            Sign Out
          </button>
        ) : user === null ? (
          <button className='textButton' onClick={() => signInWithGoogle()}>
            Sign In
          </button>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <TodoForm />
      <TodoList />
    </div>
  )
}
