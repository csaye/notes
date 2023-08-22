import { TodoData } from '@/utils/types'
import styles from '../styles/components/Todo.module.scss'
import { getAuth } from 'firebase/auth'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'

export default function Todo({ emoji, note, id }: TodoData) {
  const auth = getAuth()
  const db = getFirestore()

  return (
    <div className={styles.container}>
      <p>
        {emoji} {note}
      </p>
      <button onClick={() => deleteTodo()}>x</button>
    </div>
  )

  async function deleteTodo() {
    const { uid } = auth.currentUser ?? {}
    if (!uid) {
      throw new Error('Deleting todo with no user')
    }

    const todoRef = doc(db, 'users', uid, 'todos', id)
    await deleteDoc(todoRef)
  }
}
