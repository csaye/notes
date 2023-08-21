import Login from '@/components/Login'
import styles from '@/styles/pages/Index.module.scss'
import { NoteData } from '@/utils/types'
import { getAuth, signOut } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { useState } from 'react'

export default function Index() {
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(getDefaultDate())
  const [emoji, setEmoji] = useState('')
  const [note, setNote] = useState('')

  const auth = getAuth()
  const db = getFirestore()

  if (!auth.currentUser) {
    return <Login />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Notes</h1>
        <p>
          Signed in as <u>{auth.currentUser.email}</u>
        </p>
        <button className='textButton' onClick={() => signOut(auth)}>
          Sign Out
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createNote()
        }}
      >
        <input
          className={styles.dateField}
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
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
    </div>
  )

  async function createNote() {
    const { uid } = auth.currentUser ?? {}
    if (!uid) {
      throw new Error('Creating note with no user')
    }

    setLoading(true)

    const notesRef = collection(db, 'users', uid, 'notes')
    await addDoc(notesRef, {
      date,
      emoji,
      note,
      created: Date.now(),
      complete: false,
    } satisfies NoteData)

    setEmoji('')
    setNote('')

    setLoading(false)
  }

  function getDefaultDate() {
    const date = new Date()
    const yyyy = date.getFullYear()
    const mm = (date.getMonth() + 1).toString().padStart(2, '0')
    const dd = date.getDate().toString().padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }
}
