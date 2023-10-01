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
      className={`${styles.container} ${
        priority === 2
          ? styles.priority
          : priority === 0
          ? styles.nopriority
          : ''
      }`}
      onClick={() => updatePriority(priority === 2 ? 1 : 2)}
      onContextMenu={(e) => {
        e.preventDefault()
        updatePriority(priority === 0 ? 1 : 0)
      }}
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

  async function updatePriority(level: number) {
    setPriority(level)
    await updateDoc(todoRef, { priority: level })
  }

  async function deleteTodo() {
    await deleteDoc(todoRef)
  }
}
