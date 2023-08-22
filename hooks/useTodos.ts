import { TodoData } from '@/utils/types'
import { getAuth } from 'firebase/auth'
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

export function useTodos() {
  const auth = getAuth()
  const db = getFirestore()

  const [todos, setTodos] = useState<TodoData[]>()

  const { uid } = auth.currentUser ?? {}

  useEffect(() => {
    const todosRef = getTodosRef()

    if (!todosRef) {
      setTodos(undefined)
      return
    }

    const todosSnapshot = onSnapshot(todosRef, (todosDocs) => {
      setTodos(todosDocs.docs.map((doc) => doc.data() as TodoData))
    })
    return () => todosSnapshot()

    function getTodosRef() {
      if (!uid) {
        return null
      }

      const todosRef = collection(db, 'users', uid, 'todos')
      return query(todosRef, orderBy('created'))
    }
  }, [db, uid])

  return todos
}
