import Login from '@/components/Login'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import styles from '@/styles/pages/Index.module.scss'
import { getAuth, signOut } from 'firebase/auth'

export default function Index() {
  const auth = getAuth()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Todos</h1>
        {auth.currentUser && (
          <button className='textButton' onClick={() => signOut(auth)}>
            Sign Out
          </button>
        )}
      </div>
      <TodoForm />
      <TodoList />
    </div>
  )
}
