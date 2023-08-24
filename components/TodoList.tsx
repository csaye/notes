import styles from '../styles/components/TodoList.module.scss'
import { useTodos } from '@/hooks/useTodos'
import Todo from './Todo'

export default function TodoList() {
  const todos = useTodos()

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
