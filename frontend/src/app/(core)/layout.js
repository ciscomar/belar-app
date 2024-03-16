import '../../../src/app/styles/globals.css'
import ContentLayout from '../components/layout/ContentLayout'

export default function RootLayout({ children }) {
  return (
   
      <>
        <ContentLayout content={children}/>
      </>
   
  )
}
