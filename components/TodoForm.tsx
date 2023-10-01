import { useState } from 'react'
import styles from '../styles/components/TodoForm.module.scss'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { TodoData as TodoData } from '@/utils/types'

export default function TodoForm() {
  const [loading, setLoading] = useState(false)
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
      <input
        placeholder='Note'
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
      />
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
      note,
      created: Date.now(),
      id: todoRef.id,
      priority: 1,
    } satisfies TodoData)

    setNote('')

    setLoading(false)
  }
}
