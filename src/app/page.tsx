import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/en') // redirect root to default locale so navbar (inside locale layout) is visible
}
