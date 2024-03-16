import styles from '../styles/page.module.css'
import Login from '../components/login/Login'
export default function Home() {
  return (
    <main className={styles.main}>
      <Login />
    </main>
  )
}
