import Login from '@/components/Login'
import NoteForm from '@/components/NoteForm'
import NoteList from '@/components/NoteList'
import styles from '@/styles/pages/Index.module.scss'
import { getAuth, signOut } from 'firebase/auth'

export default function Index() {
  const auth = getAuth()

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
      <NoteForm />
      <NoteList />
    </div>
  )
}
