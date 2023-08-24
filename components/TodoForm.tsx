import { useState } from 'react'
import styles from '../styles/components/TodoForm.module.scss'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { TodoData as TodoData } from '@/utils/types'

export default function TodoForm() {
  const [loading, setLoading] = useState(false)
  const [emoji, setEmoji] = useState('')
  const [note, setNote] = useState('')

  const auth = getAuth()
  const db = getFirestore()

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault()
        createTodo()
      }}
    >
      <div className={styles.note}>
        <input
          className={styles.emojiField}
          placeholder='📝'
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        />
        <input
          className={styles.noteField}
          placeholder='Note'
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
      </div>
      <button className='textButton' disabled={!auth.currentUser || loading}>
        Create Todo
      </button>
    </form>
  )

  async function createTodo() {
    const { uid } = auth.currentUser ?? {}
    if (!uid) {
      throw new Error('Creating todo with no user')
    }

    setLoading(true)

    const todosRef = collection(db, 'users', uid, 'todos')
    const todoRef = doc(todosRef)
    await setDoc(todoRef, {
      emoji,
      note,
      created: Date.now(),
      id: todoRef.id,
      priority: false,
    } satisfies TodoData)

    setEmoji('')
    setNote('')

    setLoading(false)
  }
}
