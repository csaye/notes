import { TodoData } from '@/utils/types'
import styles from '../styles/components/Note.module.scss'
import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'

export default function Note({ emoji, note, id }: TodoData) {
  const auth = getAuth()
  const db = getFirestore()

  return (
    <div className={styles.container}>
      <p>
        {emoji} {note}
      </p>
      <button onClick={() => deleteNote()}>x</button>
    </div>
  )

  async function deleteNote() {
    const { uid } = auth.currentUser ?? {}
    if (!uid) {
      throw new Error('Deleting note with no user')
    }

    const noteRef = doc(db, 'users', uid, 'todos', id)
    await deleteDoc(noteRef)
  }
}
