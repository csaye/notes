import styles from '../styles/components/NoteList.module.scss'
import { useTodos } from '@/hooks/useTodos'
import Note from './Note'

export default function NoteList() {
  const todos = useTodos()

  if (!todos) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.container}>
      {todos.map((note) => (
        <Note {...note} key={note.id} />
      ))}
    </div>
  )
}
