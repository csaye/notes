import { NoteData } from '@/utils/types'
import { getAuth } from 'firebase/auth'
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

export function useNotes() {
  const auth = getAuth()
  const db = getFirestore()

  const [notes, setNotes] = useState<NoteData[]>()

  const { uid } = auth.currentUser ?? {}

  useEffect(() => {
    const notesRef = getNotesRef()

    if (!notesRef) {
      setNotes(undefined)
      return
    }

    const notesSnapshot = onSnapshot(notesRef, (notesDocs) => {
      setNotes(notesDocs.docs.map((doc) => doc.data() as NoteData))
    })
    return () => notesSnapshot()

    function getNotesRef() {
      if (!uid) {
        return null
      }

      const notesRef = collection(db, 'users', uid, 'notes')
      return query(notesRef, orderBy('created'))
    }
  }, [db, uid])

  return notes
}
