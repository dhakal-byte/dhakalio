import './globals.css'
export const metadata = {
  title: 'dhakal.io — CEE / IOE Prep',
  description: 'Nepal CEE & IOE entrance prep by Shirish S. Dhakal',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /></head>
      <body>{children}</body>
    </html>
  )
}
