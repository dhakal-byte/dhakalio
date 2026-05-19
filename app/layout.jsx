import './globals.css'
import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'dhakal.io — CEE / IOE Prep',
  description: 'Nepal CEE & IOE entrance exam prep platform by dhakalbytes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  )
}
