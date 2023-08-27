import styles from '../styles/components/TodoList.module.scss'
import { useTodos } from '@/hooks/useTodos'
import Todo from './Todo'
import { getAuth } from 'firebase/auth'

export default function TodoList() {
  const auth = getAuth()
  const todos = useTodos()

  if (!auth.currentUser) return null

  return (
    <div className={styles.container}>
      {!todos ? (
        <p>Loading...</p>
      ) : (
        todos.map((todo) => <Todo {...todo} key={todo.id} />)
      )}
    </div>
  )
}
