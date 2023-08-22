import styles from '../styles/components/TodoList.module.scss'
import { useTodos } from '@/hooks/useTodos'
import Todo from './Todo'

export default function TodoList() {
  const todos = useTodos()

  if (!todos) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.container}>
      {todos.map((todo) => (
        <Todo {...todo} key={todo.id} />
      ))}
    </div>
  )
}
