import { useState } from 'react'
import styles from '../styles/components/NoteForm.module.scss'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { NoteData } from '@/utils/types'

export default function NoteForm() {
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
        createNote()
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
      <button className='textButton' disabled={loading}>
        Create Note
      </button>
    </form>
  )

  async function createNote() {
    const { uid } = auth.currentUser ?? {}
    if (!uid) {
      throw new Error('Creating note with no user')
    }

    setLoading(true)

    const notesRef = collection(db, 'users', uid, 'notes')
    const noteRef = doc(notesRef)
    await setDoc(noteRef, {
      emoji,
      note,
      created: Date.now(),
      id: noteRef.id,
    } satisfies NoteData)

    setEmoji('')
    setNote('')

    setLoading(false)
  }
}
