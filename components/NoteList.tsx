import styles from '../styles/components/NoteList.module.scss'
import { useNotes } from '@/hooks/useNotes'
import Note from './Note'

export default function NoteList() {
  const notes = useNotes()

  if (!notes) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.container}>
      {notes.map((note) => (
        <Note {...note} key={note.id} />
      ))}
    </div>
  )
}
