import { TodoData } from '@/utils/types'
import styles from '../styles/components/Todo.module.scss'
import { getAuth } from 'firebase/auth'
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

export default function Todo(props: TodoData) {
  const { note, id } = props

  const auth = getAuth()
  const db = getFirestore()

  const [priority, setPriority] = useState(props.priority)

  const { uid } = auth.currentUser ?? {}
  if (!uid) {
    return null
  }
  const todoRef = doc(db, 'users', uid, 'todos', id)

  return (
    <div
      className={
        priority ? `${styles.container} ${styles.priority}` : styles.container
      }
      onClick={() => togglePriority()}
    >
      <p>{note}</p>
      <button
        onClick={(e) => {
          e.stopPropagation()
          deleteTodo()
        }}
      >
        &times;
      </button>
    </div>
  )

  async function togglePriority() {
    setPriority(!priority)
    await updateDoc(todoRef, { priority: !priority })
  }

  async function deleteTodo() {
    await deleteDoc(todoRef)
  }
}
